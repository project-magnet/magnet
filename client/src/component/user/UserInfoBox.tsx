type UserInfoBoxProps = {
	icon: string;
	contents: string;
};

const UserInfoBox = ({icon, contents}: UserInfoBoxProps) => {
	return (
		<div className={`textSmall flex items-center gap-1 text-secondary`}>
			<i className={`ri-${icon} ri-xl`} />
			<p className="">{contents}</p>
		</div>
	);
};

export default UserInfoBox;
