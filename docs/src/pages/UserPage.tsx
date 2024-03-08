import {useEffect, useState} from 'react';
import {getMember, getMemberResponse} from '../api/member';
import {LodingContainer} from '../component/common/LoadingContainer';
import {UserInfoSection} from '../component/user/UserInfoSection';
import {MentorRegistSection} from '../component/user/MentorRegistSection';
import {MentorScheduleSection} from '../component/user/MentorScheduleSection';
import {MenteeScheduleSection} from '../component/user/MenteeScheduleSection';

const UserPage = () => {
	const [MentorList, setMentorList] = useState<[]>([]);
	const [MenteeList, setMenteeList] = useState<[]>([]);
	const [member, setMember] = useState<getMemberResponse | null>(null);

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
					nickName: '정보가 없습니다',
					email: '관리자에게 보고해주세요',
					phone: '그러니까 이건 더미 데이터에요',
					picture: 'https://example.com/profile-pics/john-doe.jpg',
					memberStatus: 'active',
					city: 'New York',
					street: '123 Main St',
					roles: ['user', 'MENTOR', 'MENTEE'],
					menteeList: [],
					mentorList: [],
				});
			}
		};
		fetchMemberData();
	}, []);

	return (
		<div className="flexCol divide-y ">
			{member ? (
				<>
					{/* 멘토등록 섹션 */}
					<MentorRegistSection isMentor={member.roles.includes('MENTOR')} />
					{/* 유저정보 섹션 */}
					<UserInfoSection
						member={member}
						memtorReady={member.roles.includes('MENTOR')}
						menteeReady={member.roles.includes('MENTEE')}
					/>

					{/* 멘토스케쥴 섹션 */}
					{member.roles.includes('MENTOR') && <MentorScheduleSection mentorList={MentorList} />}

					{/* 멘티 스케쥴 섹션 */}
					{member.roles.includes('MENTEE') && <MenteeScheduleSection MenteeList={MenteeList} />}
				</>
			) : (
				<LodingContainer />
			)}
		</div>
	);
};

export default UserPage;
