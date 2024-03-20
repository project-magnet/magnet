export const LogoMagnet = ({word}: {word: string}) => {
	const wordArr = word.split('');
	return (
		<div className="flex select-none">
			{wordArr.map((el, index) => (
				<span
					className="font-PartialSansKR_Regular text-3xl tracking-[5px] hover:animate-tickle"
					key={index}
				>
					{el}
				</span>
			))}
		</div>
	);
};
