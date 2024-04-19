// 포함해야 할 데이터,
// 1. 플레이스홀더
// 2. 아이콘
// 3. value
// 4. onChange
// 5. (선택사항) onFocus
// 6. (선택사항) password
import {useState} from 'react';

type CommonInputProps = {
	placeholder: string;
	icon: string;
	value: string;
	onChange: (value: string) => void;
	onFocus?: () => void;
	password?: boolean;
};

export const CommonInput = ({
	placeholder,
	icon,
	value,
	onChange,
	onFocus,
	password,
}: CommonInputProps) => {
	const [visiblePassword, setVisiblePassword] = useState(false);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange(e.target.value);
	};

	const togglePasswordVisibility = () => {
		setVisiblePassword(!visiblePassword);
	};

	return (
		<div className="flexCenter w-full gap-2 border-b-2 p-3 focus-within:border-black">
			<i className={`ri-${icon} ri-lg ${value ? 'animate-tickle text-black' : 'text-slate-400'}`} />
			<input
				className="flex-grow text-xs outline-none"
				placeholder={placeholder}
				value={value}
				onChange={handleInputChange}
				onFocus={onFocus}
				type={password && !visiblePassword ? 'password' : 'text'}
			/>
			{password && (
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
