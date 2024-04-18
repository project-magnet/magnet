import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import UserInfoBox from './UserInfoBox';
import {removeAuthTokens} from '../../utils/auth/removeAuthTokens';
import {updateMember, updateMemberData, getMemberResponse, getMember} from '../../api/member';
import {MemberStore} from '../../store/MemberStore';
import {useOpenToastPopup} from '../../hooks/useOpenToastPopup';

export const UserInfoSection = ({member}: {member: getMemberResponse}) => {
	const [changeNickName, setChangeNickName] = useState<string>('');
	const {resetGlobalMember} = MemberStore();
	const {nickName, phone, email} = member;
	const navigate = useNavigate();
	const openToastPopup = useOpenToastPopup();

	const handleNickNameChange = async () => {
		const confirmed = window.confirm(`닉네임을 '${changeNickName}' 으로 변경하시겠습니까?`);
		if (confirmed) {
			try {
				// 회원 정보 업데이트 요청 보내기
				const updatedData: updateMemberData = {
					addressDto: {city: 'city', street: 'street'},
					nickName: changeNickName,
				};
				await updateMember(updatedData);
				await getMember();
				openToastPopup({message: '닉네임 변경에 성공했습니다', type: 'success'});
			} catch (error) {
				console.error('닉네임 변경 실패', error);
				openToastPopup({message: '닉네임 변경에 실패했습니다', type: 'error'});
			} finally {
				setChangeNickName('');
			}
		}
	};

	const handleLogout = () => {
		const confirmed = window.confirm(`로그아웃 하시겠습니까?`);
		if (confirmed) {
			removeAuthTokens();
			resetGlobalMember();
			openToastPopup({message: '로그아웃 되었습니다', type: 'success'});
			navigate('/');
		}
	};

	const hadleDeleteMember = () => {
		const confirmed = window.confirm(`${nickName}님! 정말 회원탈퇴 하시겠습니까?`);
		if (confirmed) {
			removeAuthTokens();
			navigate('/');
		}
	};
	return (
		<section className="userPageSection flexCol items-center justify-between gap-10 sm:flex-row">
			<div className="flexCol gap-3">
				{/* 닉네임 */}
				<div className="h-2">
					{changeNickName.length >= 10 && (
						<p className="textSmall animate-shake text-yellow-400 opacity-100">
							닉네임은 10글자를 초과할 수 없습니다.
						</p>
					)}
				</div>
				<div className="flex w-fit items-center border-b-2">
					<input
						placeholder={nickName}
						className="textBase bg-none outline-none"
						maxLength={10}
						value={changeNickName}
						onChange={e => setChangeNickName(e.target.value)}
					/>
					<button
						onClick={handleNickNameChange}
						className={`activeStyle ${changeNickName.length < 3 ? 'hover:text-slate-400 active:scale-100 active:bg-slate-50' : 'text-black'}`}
						disabled={changeNickName.length < 3}
					>
						<i className="ri-repeat-line ri-lg" />
					</button>
				</div>
				{/* 멘토, 멘티 여부 */}
				<div className="textSmall flex gap-2">
					{member.roles.includes('MENTOR') && (
						<div className="flexCenter h-8 w-12 rounded-md bg-additional3">
							<p className="text-white">멘토</p>
						</div>
					)}
					{member.roles.includes('MENTEE') && (
						<div className="flexCenter h-8 w-12 rounded-md bg-additional2">
							<p className="text-white">멘티</p>
						</div>
					)}
				</div>
				{/* 컨텍트 */}
				<UserInfoBox contents={phone} icon="phone-line" />
				<UserInfoBox contents={email} icon="mail-line" />
			</div>
			<div className="textSmall flex gap-2">
				<button className="buttonStyleTertiary" onClick={() => handleLogout()}>
					로그아웃
				</button>
				<button className="activeStyle" onClick={() => hadleDeleteMember()}>
					회원탈퇴
				</button>
			</div>
		</section>
	);
};
