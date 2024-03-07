import Schedulebox from '../component/user/ScheduleboxForMentor';
import UserInfoBox from '../component/user/UserInfoBox';
import {useEffect, useState} from 'react';
import {MentorRegistPopup} from '../component/user/MentorRegistPopup';
import PopupStore from '../store/PopupStore';
import {getMember, getMemberResponse} from '../api/member';
import {removeToken} from '../utils/auth/removeToken';
import {useNavigate} from 'react-router-dom';
import {LodingContainer} from '../component/common/LoadingContainer';
import {ScheduleboxForMentee} from '../component/user/ScheduleboxForMentee';

const UserPage = () => {
	const isOpen = PopupStore(state => state.isOpen);
	const setIsOpenTrue = PopupStore(state => state.setIsOpenTure);
	const [MentorList, setMentorList] = useState<[]>([]);
	const [MenteeList, setMenteeList] = useState<[]>([]);
	const [member, setMember] = useState<getMemberResponse | null>(null);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchMemberData = async () => {
			try {
				const data: getMemberResponse = await getMember();
				setMember(data);
				setMentorList(data.mentorList);
				setMenteeList(data.menteeList);
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
					roles: ['user', 'MENTOR'],
					menteeList: [],
					mentorList: [],
				});
			}
		};
		fetchMemberData();
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

	return (
		<div className="flexCol divide-y ">
			{member ? (
				<>
					{isOpen && <MentorRegistPopup />}
					{/* 멘토등록 섹션 */}
					{!member.roles.includes('MENTOR') && (
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
							<div className="flex gap-4">
								<p className="text-3xl font-semibold">{member.nickName}</p>
								{MentorList.length !== 0 && (
									<div className="flexCenter w-12 rounded-md bg-additional2">
										<p className="text-sm text-white">멘토</p>
									</div>
								)}
								{MenteeList.length !== 0 && (
									<div className="flexCenter  w-12 rounded-md bg-blue-400 ">
										<p className="text-sm text-white">멘티</p>
									</div>
								)}
							</div>
							<div className="flexCol items-start gap-2 ">
								<UserInfoBox contents={member.phone} icon={<i className="ri-phone-line ri-xl" />} />
								<UserInfoBox contents={member.email} icon={<i className="ri-mail-line ri-xl" />} />
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
					{MentorList.length !== 0 && (
						<section className="userPageSection flex-col gap-10 bg-slate-50 py-10  ">
							<div className="flexCol items-center gap-1">
								<p className="text-3xl font-bold">나의 멘토링 예약 일정</p>
								<p className="text-slate-400">안녕하세요 멘토님! 멘티의 신청여부를 확인하세요!</p>
							</div>

							<div className="flex w-full snap-x gap-10 overflow-x-auto rounded-xl bg-white p-10 shadow-inner shadow-slate-300">
								{MentorList.map((el, index) => (
									<Schedulebox props={el} />
								))}
							</div>
						</section>
					)}

					{/* 멘티 스케쥴 섹션 */}
					{MenteeList.length !== 0 && (
						<section className="userPageSection flex-col gap-10 bg-slate-50 py-10 ">
							<div className="flexCol items-center gap-1">
								<p className="text-3xl font-bold">내가 신청한 멘토링 일정</p>
								<p className="text-slate-400">안녕하세요 멘티님! 예약된 일정을 확인해보세요!</p>
							</div>

							<div className="flex w-full snap-x gap-10 overflow-x-auto rounded-xl bg-white p-10 shadow-inner shadow-slate-300">
								{MenteeList.map((el, index) => (
									<ScheduleboxForMentee props={el} key={index} />
								))}
							</div>
						</section>
					)}
				</>
			) : (
				<LodingContainer />
			)}
		</div>
	);
};

export default UserPage;
