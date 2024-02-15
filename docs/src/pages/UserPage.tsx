import ScheduleboxV2 from '../component/user/ScheduleboxV2';
import UserInfoBox from '../component/user/UserInfoBox';
import {useEffect, useState} from 'react';
import {MentorRegistPopup} from '../component/user/MentorRegistPopup';
import PopupStore from '../store/PopupStore';
import {getMember, getMemberResponse} from '../api/member';

const UserPage = () => {
	const isOpen = PopupStore(state => state.isOpen);
	const setIsOpenTrue = PopupStore(state => state.setIsOpenTure);
	const [isMentor, setIsMentor] = useState<boolean>(false);
	const [member, setMember] = useState<getMemberResponse | null>(null);

	useEffect(() => {
		const fetchMemberData = async () => {
			try {
				const data: getMemberResponse = await getMember();
				setMember(data);
				const isMentor = data.roles.includes('MENTOR');
				setIsMentor(isMentor);
			} catch (error) {
				console.error('회원 정보를 불러오는 동안 오류가 발생했습니다:', error);
				// 임시 더미 데이터
				setMember({
					id: 1,
					username: 'john.doe',
					nickName: 'John Doe',
					email: 'john.doe@example.com',
					phone: '123-456-7890',
					picture: 'https://example.com/profile-pics/john-doe.jpg',
					memberStatus: 'active',
					city: 'New York',
					street: '123 Main St',
					roles: ['user', 'admin'],
				});
			}
		};
		fetchMemberData();
		console.log(member);
	}, []);

	const handleButton = () => {
		setIsOpenTrue();
	};

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden'; // 페이지 스크롤 방지
		} else {
			document.body.style.overflow = 'auto'; // 페이지 스크롤 허용
		}
		return () => {
			document.body.style.overflow = 'auto'; // 컴포넌트 언마운트 시 스크롤 허용
		};
	}, [isOpen]);

	const userInfo = [
		{
			icon: <i className="ri-phone-line ri-2x" />,
			name: 'Phone',
			contents: member ? member.phone : '010-2321-8346',
		},

		{
			icon: <i className="ri-mail-line ri-2x" />,
			name: 'Email',
			contents: member ? member.email : 'qpwoei01234@gmail.com',
		},
	];

	return (
		<div className="flexCol divide-y ">
			{member ? (
				<>
					{isOpen && <MentorRegistPopup />}
					{/* 멘토등록 섹션 */}
					{!isMentor && (
						<section className="userPageSection py-10 gap-10 justify-between bg-slate-50 ">
							<div>
								<p className="text-4xl mb-2 font-semibold">멘토 등록하기</p>
								<p className="text-sm text-slate-400">멘토가 되어서 멘토링을 직접 개설해 보세요!</p>
							</div>
							<button className="buttonStyle" onClick={handleButton}>
								<p className="font-medium">간단하게 등록하기</p>
							</button>
						</section>
					)}
					{/* 유저정보 섹션 */}
					<section className="userPageSection py-10 gap-10 flex-col sm:flex-row ">
						<div className="flexCol gap-3 flex-grow">
							<p className="font-semibold text-xl">{member.nickName}</p>
							{isMentor && (
								<div className="bg-red-500 w-fit py-1 px-3 rounded-md">
									<p className="text-sm text-white">멘토</p>
								</div>
							)}
						</div>
						<div className="flex flex-grow gap-10 flex-col sm:flex-row">
							{userInfo.map((el, index) => (
								<UserInfoBox contents={el.contents} icon={el.icon} name={el.name} key={index} />
							))}
						</div>
						<div className="flex gap-2">
							<button className="buttonStyle py-2 px-4">
								<p className="font-semibold">회원 수정</p>
							</button>
							<button className="buttonStyle py-2 px-4">
								<p className="text-slate-400">회원 탈퇴</p>
							</button>
						</div>
					</section>

					{/* 멘토스케쥴 섹션 */}
					{isMentor && (
						<section className="userPageSection py-10 gap-10 flex-col  bg-slate-50 ">
							<div className="flexCol items-center gap-1">
								<p className="text-3xl font-bold">Mentoring Schedule</p>
								<p className="text-slate-400">예약된 멘토링 일정을 확인하세요!</p>
							</div>

							<div
								className="flex gap-10 w-full overflow-x-auto snap-x p-10 
        				shadow-inner shadow-slate-300 rounded-xl bg-white"
							>
								<ScheduleboxV2 />
								<ScheduleboxV2 />
								<ScheduleboxV2 />
								<ScheduleboxV2 />
								<ScheduleboxV2 />
								<ScheduleboxV2 />
							</div>
						</section>
					)}
				</>
			) : (
				<div>로딩중</div>
			)}
		</div>
	);
};

export default UserPage;
