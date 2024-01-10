const ScheduleboxV2 = () => {
  return (
    <div className="buttonStyle flexCenter snap-center flex-col min-w-96  h-40 ">
      <div className="w-full h-full relative">
        <div className="flex-col w-2/3 h-full bg-white absolute left-0 rounded-tl-md flexCenter">
          <p className="font-semibold text-">2024.01.18 (목) 21:00~22:00</p>
        </div>
        <div className="w-1/3 h-full bg-gradient-to-l from-transparent via- to-white absolute left-2/3 z-10"></div>
        <img
          className=" w-1/3 h-full object-cover rounded-tr-md flex-1 absolute left-2/3 "
          src="https://meeco.kr/files/attach/images/134/521/515/025/ce61474334ece9cb04216478c360b36d.png"
        />
      </div>
    </div>
  );
};

export default ScheduleboxV2;
