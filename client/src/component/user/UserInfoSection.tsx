import {useState} from 'react';
import {getMemberResponse} from '../../api/member';
import UserInfoBox from './UserInfoBox';
import {removeToken} from '../../utils/auth/removeToken';
import {useNavigate} from 'react-router-dom';
import {updateMember, updateMemberData, deleteMember} from '../../api/member';

export const UserInfoSection = ({
	member,
	memtorReady,
	menteeReady,
}: {
	member: getMemberResponse;
	memtorReady: boolean;
	menteeReady: boolean;
}) => {
	const [changeNickName, setChangeNickName] = useState<string>('');
	const {nickName, phone, email} = member;
	const navigate = useNavigate();

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
				window.alert('닉네임 변경 성공!');
				window.location.reload();
			} catch (error) {
				console.error('닉네임 변경 실패', error);
				window.alert('닉네임 변경에 실패했습니다  ' + error);
				setChangeNickName('');
			}
		}
	};

	const handleLogout = () => {
		const confirmed = window.confirm(`로그아웃 하시겠습니까?`);
		if (confirmed) {
			removeToken();
			navigate('/');
		}
	};

	const hadleDeleteMember = () => {
		const confirmed = window.confirm(`${nickName}님! 정말 회원탈퇴 하시겠습니까?`);
		if (confirmed) {
			removeToken();
			navigate('/');
		}
	};
	return (
		<section className="userPageSection flex-col justify-between  gap-10 py-10 lg:flex-row ">
			<div className="flexCol   gap-3">
				{/* 닉네임 */}
				<div className="h-2">
					{changeNickName.length >= 10 && (
						<p className="animate-shake text-sm text-yellow-400 opacity-100">
							닉네임은 10글자를 초과할 수 없습니다.
						</p>
					)}
				</div>
				<div className="flex items-center border-b-2">
					<input
						placeholder={nickName}
						className="rounded-lg bg-none font-semibold outline-none sm:w-72 sm:text-2xl"
						maxLength={10}
						value={changeNickName}
						onChange={e => setChangeNickName(e.target.value)}
					></input>
					<button
						onClick={handleNickNameChange}
						className={`activeStyle ${changeNickName.length < 3 ? 'hover:text-slate-400 active:scale-100 active:bg-slate-50' : 'text-black'}`}
						disabled={changeNickName.length < 3}
					>
						<i className="ri-repeat-line ri-xl" />
					</button>
				</div>
				{/* 멘토, 멘티 여부 */}
				<div className="flex gap-2">
					{memtorReady && (
						<div className="flexCenter h-8 w-12 rounded-md bg-additional2">
							<p className="text-sm text-white">멘토</p>
						</div>
					)}
					{menteeReady && (
						<div className="flexCenter h-8 w-12 rounded-md bg-blue-400 ">
							<p className="text-sm text-white">멘티</p>
						</div>
					)}
				</div>
				{/* 컨텍트 */}
				<div className="flexCol items-start gap-2 ">
					<UserInfoBox contents={phone} icon={<i className="ri-phone-line ri-xl" />} />
					<UserInfoBox contents={email} icon={<i className="ri-mail-line ri-xl" />} />
				</div>
			</div>
			<div className="flex gap-2">
				<button className="buttonStyleTertiary" onClick={() => handleLogout()}>
					로그아웃
				</button>
				<button className="activeStyle text-sm" onClick={() => hadleDeleteMember()}>
					회원 탈퇴
				</button>
			</div>
		</section>
	);
};
