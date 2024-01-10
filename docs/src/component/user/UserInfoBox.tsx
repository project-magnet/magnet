type UserInfoBoxProps = {
  icon: JSX.Element,
  name: string,
  contents: string,
};

const UserInfoBox: React.FC<UserInfoBoxProps> = ({ icon, name, contents }) => {
  return (
    <div className="flexCol items-center flex-1">
      {icon}
      <p className="text-sm">{name}</p>
      <p className="mt-5 text-sm font-semibold">{contents}</p>
    </div>
  );
};

export default UserInfoBox;
