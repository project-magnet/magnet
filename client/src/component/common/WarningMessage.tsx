type WarningMessageProps = {
	message: string;
	isSuccess?: boolean;
	visible?: boolean;
};

export const WarningMessage = ({
	message,
	isSuccess = false,
	visible = true,
}: WarningMessageProps) => {
	if (!visible) return null;

	const className = isSuccess ? 'success animate-disappear' : 'warning animate-shake';
	const content = isSuccess ? '올바른 값입니다.' : message;

	return <p className={className}>{content}</p>;
};
