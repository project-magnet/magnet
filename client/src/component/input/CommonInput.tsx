import {useState} from 'react';

type CommonInputProps = {
	placeholder: string;
	icon: string;
	value: string;
	onChange: (value: string) => void;
	type?: inputType;
};
// inputType은 number와 password, month 세 가지 중 하나만 가능합니다.
type inputType = 'number' | 'password' | 'month';

export const CommonInput = ({placeholder, icon, value, onChange, type}: CommonInputProps) => {
	const [isVisible, setIsVisible] = useState(false);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange(e.target.value);
	};

	// inputType이 password일 경우, visiblePassword 상태에 따라 type을 변경합니다.
	const typeLogic = type === 'password' ? (isVisible ? 'text' : 'password') : type;

	return (
		<div
			className={`flexCenter w-full gap-2 border-b-2 p-3 transition-colors duration-200  focus-within:border-additional3`}
		>
			<i className={`ri-${icon} ri-lg ${value ? 'animate-tickle text-black' : 'text-slate-400'}`} />
			<input
				className="flex-grow text-xs outline-none"
				placeholder={placeholder}
				value={value}
				onChange={handleInputChange}
				type={typeLogic}
			/>
			{type === 'password' && (
				<VisibleToggleButton isVisible={isVisible} setIsVisible={setIsVisible} />
			)}
		</div>
	);
};

// 클릭 시 비밀번호 보이기/숨기기 기능버튼
const VisibleToggleButton = ({
	isVisible,
	setIsVisible,
}: {
	isVisible: boolean;
	setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const togglePasswordVisibility = () => {
		setIsVisible(pre => !pre);
	};
	return (
		<i
			onClick={togglePasswordVisibility}
			className={`ri-${isVisible ? 'eye' : 'eye-off'}-fill ri-lg cursor-pointer ${
				isVisible ? 'text-black' : 'text-slate-400 '
			} transition-colors `}
		/>
	);
};

export default CommonInput;
