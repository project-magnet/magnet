type UserInfoBoxProps = {
	icon: string;
	contents: string;
	style?: string;
};

const UserInfoBox = ({icon, contents, style}: UserInfoBoxProps) => {
	return (
		<div className={`${style} flex items-center gap-1 text-secondary`}>
			<i className={`ri-${icon} ri-xl`} />
			<p className="">{contents}</p>
		</div>
	);
};

export default UserInfoBox;
