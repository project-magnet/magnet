// 포함해야 할 데이터,
// 1. 플레이스홀더
// 2. 아이콘
// 3. value
// 4. onChange
// 5. (선택사항) onFocus
// 6. (선택사항) inputType
import {useState} from 'react';

type CommonInputProps = {
	placeholder: string;
	icon: string;
	value: string;
	onChange: (value: string) => void;
	onFocus?: () => void;
	inputType?: inputType;
};
// inputType은 number와 password, month 세 가지 중 하나만 가능합니다.
type inputType = 'number' | 'password' | 'month';

export const CommonInput = ({
	placeholder,
	icon,
	value,
	onChange,
	onFocus,
	inputType,
}: CommonInputProps) => {
	const [visiblePassword, setVisiblePassword] = useState(false);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange(e.target.value);
	};

	const togglePasswordVisibility = () => {
		setVisiblePassword(!visiblePassword);
	};

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
				onFocus={onFocus}
				type={inputType}
			/>
			{inputType === 'password' && (
				// 클릭 시 비밀번호 보이기/숨기기 기능버튼
				<i
					onClick={togglePasswordVisibility}
					className={`ri-${visiblePassword ? 'eye' : 'eye-off'}-fill ri-lg cursor-pointer ${
						visiblePassword ? 'text-black' : 'text-slate-400 '
					}`}
				/>
			)}
		</div>
	);
};

export default CommonInput;
