import React from 'react';

interface MentorInfoBoxProps {
  title: string;
  contents: string;
  icon: string;
}

const MentorInfoBox: React.FC<MentorInfoBoxProps> = ({ title, contents, icon }) => {
  return (
    <div className="flexCenter justify-start gap-4 p-4 rounded-md border w-full">
      <div className="w-[100px]">
        <img src={icon} alt="아이콘" />
      </div>
      <div className="flexCol gap-2 flex-grow">
        <p className="text-xl font-medium ">{title}</p>
        <p className="">{contents}</p>
      </div>
    </div>
  );
};

export default MentorInfoBox;
