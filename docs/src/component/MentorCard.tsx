import React from 'react';
import { Link } from 'react-router-dom';

const MentorCard = () => {
  return (
    <Link to="/mentor">
      <div className="p-7 h-80 m-10 md:m-3 xl:m-5 bg-white buttonStyle">
        <div className="h-1/2 flex">
          <div className="w-14 ">
            <img
              className="rounded-full "
              src="https://www.urbanbrush.net/web/wp-content/uploads/edd/2023/02/urban-20230228144115810458.jpg"
            />
          </div>
          <div className=" mx-5">
            <p className=" font-bold text-2xl ">김브라키오사우루스</p>
            <p className=" text-slate-500  text-sm mt-1">#투썸플레이스</p>
            <p className=" text-slate-500  text-sm mt-1">#프론트엔드 </p>
            <p className=" text-slate-500  text-sm mt-1">#23년차 시니어</p>
          </div>
        </div>
        <div className="h-1/2 p-1">
          <p className="text-xl">이 남자는 어떻게 23년이나..?</p>
          <p className="text-xl">장기근속의 비밀에 대해서 알려드립니다.</p>
        </div>
      </div>
    </Link>
  );
};

export default MentorCard;
