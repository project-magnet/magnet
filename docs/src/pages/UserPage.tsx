import ScheduleboxV2 from '../component/user/ScheduleboxV2';
import UserInfoBox from '../component/user/UserInfoBox';
import {useEffect, useState} from 'react';
import {MentorRegistPopup} from '../component/user/MentorRegistPopup';
import PopupStore from '../store/PopupStore';
import {getMember, getMemberResponse} from '../api/member';
import {removeToken} from '../utils/auth/removeToken';
import {useNavigate} from 'react-router-dom';

const UserPage = () => {
	const isOpen = PopupStore(state => state.isOpen);
	const setIsOpenTrue = PopupStore(state => state.setIsOpenTure);
	const [isMentor, setIsMentor] = useState<boolean>(false);
	const [member, setMember] = useState<getMemberResponse | null>(null);
	const navigate = useNavigate();

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
					nickName: '유저 정보가 없습니다',
					email: '관리자에게 보고해주세요 제발요',
					phone: '그러니까 이건 더미 데이터에요',
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

	const handleLogout = () => {
		removeToken();
		navigate('/magnet');
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
			icon: <i className="ri-phone-line ri-xl" />,

			contents: member ? member.phone : '010-2321-8346',
		},

		{
			icon: <i className="ri-mail-line ri-xl" />,

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
						<section className="userPageSection flex-col justify-between gap-10  bg-gradient-to-r  from-additional2 to-additional3 py-10 lg:flex-row">
							<div>
								<p className="mb-2 text-4xl font-semibold">멘토 등록하기</p>
								<p className="text-sm ">멘토가 되어서 멘토링을 직접 개설해 보세요!</p>
							</div>
							<button className="buttonStyle" onClick={handleButton}>
								<p className="font-medium ">간단하게 등록하기</p>
							</button>
						</section>
					)}
					{/* 유저정보 섹션 */}
					<section className="userPageSection flex-col justify-between gap-10 bg-slate-50 py-10 lg:flex-row ">
						<div className="flexCol  gap-3">
							<p className="text-3xl font-semibold">{member.nickName}</p>
							{isMentor && (
								<div className="w-fit rounded-md bg-red-500 px-3 py-1">
									<p className="text-sm text-white">멘토</p>
								</div>
							)}
							<div className="flexCol items-start gap-2 ">
								{userInfo.map((el, index) => (
									<UserInfoBox contents={el.contents} icon={el.icon} key={index} />
								))}
							</div>
						</div>

						<div className="flex gap-2">
							<button className="buttonStyle px-4 py-2" onClick={() => handleLogout()}>
								로그아웃
							</button>
							<button className="px-4 py-2 text-slate-400">회원 탈퇴</button>
						</div>
					</section>

					{/* 멘토스케쥴 섹션 */}
					{isMentor && (
						<section className="userPageSection flex-col gap-10 bg-slate-50 py-10 ">
							<div className="flexCol items-center gap-1">
								<p className="text-3xl font-bold">Mentoring Schedule</p>
								<p className="text-slate-400">예약된 멘토링 일정을 확인하세요!</p>
							</div>

							<div className="flex w-full snap-x gap-10 overflow-x-auto rounded-xl bg-white p-10 shadow-inner shadow-slate-300">
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
