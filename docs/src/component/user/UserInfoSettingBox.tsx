import {useState} from 'react';

type UserInfoSettingBoxProps = {
	nickName: string;
};

export const UserInfoSettingBox = ({nickName}: UserInfoSettingBoxProps) => {
	const [changeNickName, setChangeNickName] = useState<string>('');

	const handleNickNameChange = () => {
		const confirmed = window.confirm(`닉네임을 '${changeNickName}' 으로 변경하시겠습니까?`);
		if (confirmed) {
			// 변경 로직 시작
			console.log('변경 로직 시작');
		}
	};
	return (
		<>
			<div className="h-2">
				{changeNickName.length >= 10 && (
					<p className="animate-shake text-sm text-additional2 opacity-100">
						닉네임은 10글자를 초과할 수 없습니다.
					</p>
				)}
			</div>
			<div className="flex flex-col gap-4 sm:flex-row">
				<input
					placeholder={nickName}
					className="w-72 text-3xl font-semibold"
					maxLength={10}
					value={changeNickName}
					onChange={e => setChangeNickName(e.target.value)}
				></input>
				<button
					onClick={handleNickNameChange}
					className={`buttonStyle ${changeNickName.length === 0 ? 'opacity-30' : ''}`}
				>
					변경하기
				</button>
			</div>
		</>
	);
};
