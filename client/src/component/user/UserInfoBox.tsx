type UserInfoBoxProps = {
	icon: JSX.Element;
	contents: string;
};

const UserInfoBox: React.FC<UserInfoBoxProps> = ({icon, contents}) => {
	return (
		<div className="flex items-center justify-center gap-2">
			{icon}
			<p className="text-sm font-semibold">{contents}</p>
		</div>
	);
};

export default UserInfoBox;
