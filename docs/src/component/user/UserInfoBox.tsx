type UserInfoBoxProps = {
	icon: JSX.Element;
	contents: string;
};

const UserInfoBox: React.FC<UserInfoBoxProps> = ({icon, contents}) => {
	return (
		<div className="flexCol flex-1 items-center">
			{icon}
			<p className="mt-5 text-sm font-semibold">{contents}</p>
		</div>
	);
};

export default UserInfoBox;
