export const PopupCloseButton = ({
	handleClick,
}: {
	handleClick: React.MouseEventHandler<HTMLElement>;
}) => {
	return (
		<div className="absolute right-1 top-1">
			<i
				onClick={handleClick}
				className="ri-close-line cursor-pointer text-2xl  text-slate-400 transition-colors duration-300 hover:text-black"
			></i>
		</div>
	);
};
