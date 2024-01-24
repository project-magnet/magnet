import ScheduleboxV2 from '../component/user/ScheduleboxV2';
import UserInfoBox from '../component/user/UserInfoBox';
import { useEffect } from 'react';
import { MentorRegistPopup } from '../component/user/MentorRegistPopup';
import PopupStore from '../store/PopupStore';

const UserPage = () => {
  const isOpen = PopupStore(state => state.isOpen);
  const setIsOpenTrue = PopupStore(state => state.setIsOpenTure);

  const handleButton = () => {
    setIsOpenTrue();
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'; // 페이지 스크롤 방지
    } else {
      document.body.style.overflow = 'auto'; // 페이지 스크롤 허용
    }
    return () => {
      document.body.style.overflow = 'auto'; // 컴포넌트 언마운트 시 스크롤 허용
    };
  }, [isOpen]);

  const userInfo = [
    { icon: <i className="ri-phone-line ri-2x" />, name: 'Phone', contents: '010-2321-8346' },
    {
      icon: <i className="ri-home-3-line ri-2x " />,
      name: 'Adress',
      contents: '경기 구리시 경춘로 223 명동빌딩',
    },
    {
      icon: <i className="ri-mail-line ri-2x" />,
      name: 'Email',
      contents: 'qpwoei01234@gmail.com',
    },
  ];

  return (
    <div className="flexCol divide-y ">
      {isOpen && <MentorRegistPopup />}
      {/* 첫번째 섹션 */}
      <section className="userPageSection py-10 gap-10 flex-col sm:flex-row ">
        <img
          className="h-32 rounded-2xl"
          src="https://www.urbanbrush.net/web/wp-content/uploads/edd/2023/02/urban-20230228144115810458.jpg"
        />
        <div className="flexCol gap-3 flex-grow">
          <p className="font-semibold text-xl">김브라키오사우루스</p>
          <div className="bg-red-500 w-fit py-1 px-3 rounded-md">
            <p className="text-sm text-white">멘토</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="buttonStyle py-2 px-4">
            <p className="font-semibold">회원 수정</p>
          </button>
          <button className="buttonStyle py-2 px-4">
            <p className="text-slate-400">회원 탈퇴</p>
          </button>
        </div>
      </section>
      {/* 두번째 섹션 */}
      <section className="userPageSection py-10 gap-10 flex-col xl:flex-row">
        <p className="text-3xl font-bold">Contact Details</p>
        <div className="flex flex-grow gap-10 flex-col sm:flex-row">
          {userInfo.map((el, index) => (
            <UserInfoBox contents={el.contents} icon={el.icon} name={el.name} key={index} />
          ))}
        </div>
      </section>
      {/* 세번쨰 섹션 */}
      <section className="userPageSection py-10 gap-10 justify-between bg-slate-50 ">
        <div>
          <p className="text-4xl mb-2 font-semibold">멘토 등록하기</p>
          <p className="text-sm text-slate-400"> 멘토가 되어서 멘토링을 직접 개설해 보세요!</p>
        </div>
        <button className="buttonStyle py-2 px-4" onClick={handleButton}>
          <p className="font-semibold">간단하게 등록하기</p>
        </button>
      </section>
      {/* 네번째 섹션 */}
      <section className="userPageSection py-10 gap-10 flex-col  bg-slate-50 ">
        <div className="flexCol items-center gap-1">
          <p className="text-3xl font-bold">Mentoring Schedule</p>
          <p className="text-slate-400">예약된 멘토링 일정을 확인하세요!</p>
        </div>

        <div
          className="flex gap-10 w-full overflow-x-auto snap-x p-10 
        shadow-inner shadow-slate-300 rounded-xl bg-white"
        >
          <ScheduleboxV2 />
          <ScheduleboxV2 />
          <ScheduleboxV2 />
          <ScheduleboxV2 />
          <ScheduleboxV2 />
          <ScheduleboxV2 />
        </div>
      </section>
    </div>
  );
};

export default UserPage;
