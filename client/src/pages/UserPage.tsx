import {LodingContainer} from '../component/common/LoadingContainer';
import {UserInfoSection} from '../component/user/UserInfoSection';
import {MentorRegistSection} from '../component/user/MentorRegistSection';
import {MentorScheduleSection} from '../component/user/MentorScheduleSection';
import {MenteeScheduleSection} from '../component/user/MenteeScheduleSection';
import {MemberStore} from '../store/MemberStore';

const UserPage = () => {
	const {globalMember} = MemberStore();

	return (
		<div className="flexCol rootPageSection items-center gap-5 py-10">
			{globalMember ? (
				<>
					{/* 멘토등록 섹션 */}
					<MentorRegistSection isMentor={globalMember.roles.includes('MENTOR')} />
					{/* 유저정보 섹션 */}
					<UserInfoSection member={globalMember} />

					{/* 멘토스케쥴 섹션 */}
					{globalMember.roles.includes('MENTOR') && (
						<MentorScheduleSection mentorList={globalMember.mentorList} />
					)}

					{/* 멘티 스케쥴 섹션 */}
					{globalMember.roles.includes('MENTEE') && (
						<MenteeScheduleSection MenteeList={globalMember.menteeList} />
					)}
				</>
			) : (
				<LodingContainer />
			)}
		</div>
	);
};

export default UserPage;
