type PaymentInputProps = {
  label: string,
  placeholder: string,
};

const PaymentInput: React.FC<PaymentInputProps> = ({ label, placeholder }) => {
  return (
    <div className="flexCol gap-1">
      <label className="text-xs text-slate-500">{label}</label>
      <input
        className="w-full h-10 border rounded-md p-3 font-light text-sm"
        placeholder={placeholder}
      />
    </div>
  );
};

export default PaymentInput;
