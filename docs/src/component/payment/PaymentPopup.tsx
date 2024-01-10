import 'remixicon/fonts/remixicon.css';
import PaymentInput from './PaymentInput';
import PaymentButton from './PaymentButton';
import { useEffect, useState } from 'react';
import PopupStore from '../../store/PopupStore';
import { useLocation } from 'react-router-dom';

const PaymentPopup = () => {
  const setIsOpenFalse = PopupStore(state => state.setIsOpenFalse);
  const [pageNumber, setPageNumber] = useState(1);
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const pageParam = searchParams.get('page');

    if (pageParam) {
      setPageNumber(Number(pageParam));
    }
  }, [location.search]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // 팝업 영역 자체를 클릭한 경우에만 팝업을 닫습니다.
    if (e.target === e.currentTarget) {
      setIsOpenFalse();
    }
  };

  return (
    <div
      onClick={handleClick}
      className="flexCenter w-full h-full fixed bg-opacity-30 bg-black z-10 top-0 "
    >
      <section className="flexCol mt-48 md:mt-0 pb-32 md:pb-8 bg-white w-full md:w-[500px] h-full p-8 rounded-xl z-20 gap-5 overflow-y-auto">
        <div className="flex justify-between items-center">
          <div className="flex gap-3 items-center">
            <p className="text-lg font-semibold">
              {pageNumber == 1 ? '신청하기' : '신청 정보 확인'}
            </p>
            <p className="text-slate-400 text-sm">{`${pageNumber}/2`}</p>
          </div>
          <i
            onClick={handleClick}
            className="ri-close-line text-2xl cursor-pointer  text-slate-400"
          ></i>
        </div>
        <div className="flexCol flex-grow gap-5">
          {pageNumber == 1 ? (
            <>
              <PaymentInput label="스케줄 설정" placeholder="날짜 및 시간 선택" />
              <PaymentInput label="실명" placeholder="실명을 입력해 주세요" />
              <PaymentInput
                label="연락 가능한 연락처"
                placeholder="수락 시에만 멘토에게 공개됩니다"
              />
              <PaymentInput
                label="연락 가능한 이메일 "
                placeholder="수락 시에만 멘토에게 공개됩니다"
              />
              <PaymentInput
                label="멘토에게 전달사항"
                placeholder="멘토링을 시작하기 전, 전달할 내용을 상세하게 남겨주실 수록 더욱 의미있는 시간을 가질 수 있습니다 :)"
              />
            </>
          ) : (
            <>
              <div>
                <span>멘토</span>
                <span className="ml-3 text-slate-500 text-sm">김브라키오사우루스</span>
              </div>
              <div>
                <span>멘티</span>
                <span className="ml-3 text-slate-500 text-sm">박실명</span>
              </div>
              <div>
                <span>일정</span>
                <span className="ml-3 text-slate-500 text-sm">2024.01.18 (목), 21:00~22:00</span>
              </div>
              <div>
                <span>연락처</span>
                <span className="ml-3 text-slate-500 text-sm">010-2321-8346</span>
              </div>
              <div>
                <span>이메일</span>
                <span className="ml-3 text-slate-500 text-sm">qpwoei01234@gmail.com</span>
              </div>
              <div>
                <span>메시지</span>
                <span className="ml-3 text-slate-500 text-sm">취업 안되면 고소함.</span>
              </div>
            </>
          )}
        </div>

        <div className="flex justify-end gap-3">
          {pageNumber == 1 ? (
            <PaymentButton pageNumber={pageNumber} type="next" />
          ) : (
            <>
              <PaymentButton pageNumber={pageNumber} type="previous" />
              <PaymentButton pageNumber={pageNumber} type="payment" />
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default PaymentPopup;
