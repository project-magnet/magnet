type WarningMessageProps = {
	message: string;
	isSuccess?: boolean;
};

export const WarningMessage = ({message, isSuccess = false}: WarningMessageProps) => {
	return isSuccess ? null : <p className={`${'warning animate-shake'} my-1`}>{message}</p>;
};
