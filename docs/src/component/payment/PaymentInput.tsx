type PaymentInputProps = {
	label: string;
	placeholder: string;
	data: string;
	setData: (arg0: string) => void;
};

const PaymentInput: React.FC<PaymentInputProps> = ({label, placeholder, data, setData}) => {
	return (
		<div className="flexCol gap-1">
			<label className="text-xs text-slate-500">{label}</label>
			<input
				className="h-10 w-full rounded-md border p-3 text-sm font-light"
				placeholder={placeholder}
				value={data}
				onChange={e => setData(e.target.value)}
			/>
		</div>
	);
};

export default PaymentInput;
