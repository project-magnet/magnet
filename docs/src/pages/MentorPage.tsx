import { useEffect } from 'react';
import MentorInfoBox from '../component/MentorInfoBox';
import PaymentPopup from '../component/payment/PaymentPopup';
import PopupStore from '../store/PopupStore';
import { useNavigate } from 'react-router-dom';

const MentorPage = () => {
  const isOpen = PopupStore(state => state.isOpen);
  const setIsOpenTrue = PopupStore(state => state.setIsOpenTure);
  const navigate = useNavigate();

  const handleButton = () => {
    setIsOpenTrue();
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'; // 페이지 스크롤 방지
    } else {
      navigate('');
      document.body.style.overflow = 'auto'; // 페이지 스크롤 허용
    }
    return () => {
      document.body.style.overflow = 'auto'; // 컴포넌트 언마운트 시 스크롤 허용
    };
  }, [isOpen]);

  const infoData = {
    technology: {
      icon: 'https://cdn-icons-png.flaticon.com/512/6000/6000354.png',
      title: '기술',
      description: 'HTML, CSS, JavaScript, React, Coffee',
    },
    experience: {
      icon: 'https://cdn-icons-png.flaticon.com/512/3504/3504016.png',
      title: '경험',
      description: '다양한 스타트업 및 대기업을 위한 프로젝트 경험',
    },
    education: {
      icon: 'https://cdn-icons-png.flaticon.com/512/4117/4117763.png',
      title: '교육',
      description: '컴퓨터 과학 학사 학위',
    },
  };
  return (
    <>
      {isOpen && <PaymentPopup />}
      <div className="flexCenter justify-evenly w-full p-10 border-b flex-col lg:flex-row gap-10">
        <div className="flexCol gap-6 order-2 lg:order-1">
          <p className=" text-6xl font-bold">피할 수 없으면 즐겨라.</p>
          <p className="">
            안녕하세요! 웹 디자인 및 개발 및 바리스타 분야에서 경험한 멘토 김브라키오사우루스입니다.
          </p>
          <div className="flexCenter justify-start">
            <button
              onClick={handleButton}
              className="bg-black flexCenter py-3 w-40 buttonStyle text-white"
            >
              만나러 가기!
            </button>
            <p className="ml-4 text-stone-500">1회 30분 / 165,000원</p>
          </div>
        </div>
        <div className=" w-full sm:w-[500px] order-1 lg:order-2">
          <img
            src="https://www.urbanbrush.net/web/wp-content/uploads/edd/2023/02/urban-20230228144115810458.jpg"
            className="rounded-3xl"
          />
        </div>
      </div>

      <div className="flexCenter justify-evenly w-full py-20  flex-col lg:flex-row gap-10 p-10 ">
        <div className="flexCol gap-6 ">
          <p className="text-5xl font-bold ">About Me</p>
          <p className="">
            89년 이상의 경험을 통해 프론트엔드 개발과 UI/UX 디자인에 특화되어 있습니다.
          </p>
        </div>

        <div className="flexCol gap-10 ">
          <MentorInfoBox
            title={infoData.technology.title}
            contents={infoData.technology.description}
            icon={infoData.technology.icon}
          />
          <MentorInfoBox
            title={infoData.experience.title}
            contents={infoData.experience.description}
            icon={infoData.experience.icon}
          />
          <MentorInfoBox
            title={infoData.education.title}
            contents={infoData.education.description}
            icon={infoData.education.icon}
          />
        </div>
      </div>
    </>
  );
};

export default MentorPage;
