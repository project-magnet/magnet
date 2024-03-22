import {useState} from 'react';

type PeriodInputProps = {
	value: string;
	onChange: (value: string) => void;
};

export const PeriodInput = ({value, onChange}: PeriodInputProps) => {
	const [isPastTime, setIsPastTime] = useState(false);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const selectedDate = new Date(e.target.value);
		const currentDate = new Date();
		currentDate.setMonth(currentDate.getMonth() - 1);

		if (selectedDate < currentDate) {
			setIsPastTime(true);
			setTimeout(() => {
				setIsPastTime(false);
			}, 3000);
		} else {
			onChange(e.target.value);
		}
	};

	return (
		<>
			<div className="flexCenter w-full gap-2 border-b-2 p-3 focus-within:border-additional2">
				<i
					className={`ri-calendar-line ri-lg ${
						value ? 'animate-tickle text-black' : 'text-slate-400'
					}`}
				/>
				<input
					className={`flex-grow text-xs outline-none ${value ? ' text-black' : 'text-slate-400'}`}
					placeholder="날짜"
					value={value}
					onChange={handleInputChange}
					type="month"
				/>
			</div>
			{isPastTime && (
				<p className="warning animate-shake text-yellow-400">과거의 시간은 선택할 수 없습니다.</p>
			)}
		</>
	);
};
