export const WarningMessage = ({message, isSuccess}: {message: string; isSuccess?: boolean}) => {
	return (
		<p className={isSuccess ? 'success animate-disappear' : 'warning animate-shake'}>
			{isSuccess ? '올바른 값입니다.' : message}
		</p>
	);
};
