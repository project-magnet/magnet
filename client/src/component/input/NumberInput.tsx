// 1.value
// 2.onChange
// 3.placeholder
// 4.step
// 5.min
// 6.max
import {useState} from 'react';

type NumberInputProps = {
	value: string;
	onChange: (value: string) => void;
	placeholder: string;
	step: number;
	min: number;
	max: number;
	icon: string;
};

export const NumberInput = ({
	value,
	onChange,
	placeholder,
	step,
	min,
	max,
	icon,
}: NumberInputProps) => {
	const [isBoundaryValue, setIsBoundaryValue] = useState(false);
	if (isBoundaryValue) {
		setTimeout(() => {
			setIsBoundaryValue(false);
		}, 3000);
	}

	return (
		<>
			<div className={`flexCenter w-full gap-2 border-b-2 p-3 focus-within:border-black `}>
				<i
					className={`ri-${icon} ri-lg ${value ? 'animate-tickle text-black' : 'text-slate-400'}`}
				/>
				<input
					className="flex-grow text-xs text-black outline-none"
					type="number"
					value={value}
					onChange={e => {
						let newValue = parseInt(e.target.value);
						if (newValue < min) {
							newValue = min;
							setIsBoundaryValue(true);
						} else if (newValue > max) {
							newValue = max;
							setIsBoundaryValue(true);
						} else {
						}
						onChange(newValue.toString());
					}}
					placeholder={placeholder}
					step={step}
					min={min}
					max={max}
				/>
			</div>
			{isBoundaryValue && (
				<p className="warning animate-shake text-yellow-400">
					{placeholder}의 최대값은 {max}입니다.
				</p>
			)}
		</>
	);
};
