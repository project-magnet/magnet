// 셀렉트 컴포넌트
// 1. 밸류
// 2. 온체인지
// 3. 플레이스홀더
// 4. 옵션에 들어갈 데이터 배열
// 5. 아이콘

type SelectInputProps = {
	value: string;
	onChange: (value: string) => void;
	placeholder: string;
	options: {value: string; label: string}[];
	icon: string;
};

export const SelectInput = ({value, onChange, placeholder, options, icon}: SelectInputProps) => {
	return (
		<div className={`flexCenter w-full gap-1 border-b-2 p-3 focus-within:border-additional2 `}>
			<i className={`ri-${icon} ri-lg ${value ? 'animate-tickle text-black' : 'text-slate-400'}`} />
			<select
				className={`flex-grow text-xs outline-none ${value ? 'text-black' : 'text-slate-400'}`}
				value={value}
				onChange={e => onChange(e.target.value)}
			>
				<option value="" selected hidden>
					{placeholder}
				</option>
				{options.map(option => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
		</div>
	);
};
