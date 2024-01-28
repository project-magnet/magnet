// 필요한 import 구문들을 먼저 추가
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PopupStore from '../../store/PopupStore';

// PaymentButton 컴포넌트 정의
type PaymentButtonProps = {
  type: 'previous' | 'next' | 'payment',
  pageNumber: number,
};

const PaymentButton: React.FC<PaymentButtonProps> = ({ type, pageNumber }) => {
  const navigate = useNavigate();
  const setIsOpenFalse = PopupStore(state => state.setIsOpenFalse);

  let buttonText = '';
  let buttonHandler = () => {};

  switch (type) {
    case 'next':
      buttonText = '다음으로';
      buttonHandler = () => {
        // 다음 페이지로 이동
        navigate(`?page=${pageNumber + 1}`);
      };
      break;

    case 'previous':
      buttonText = '이전으로';
      buttonHandler = () => {
        // 이전 페이지로 이동
        navigate(`?page=${pageNumber - 1}`);
      };
      break;

    case 'payment':
      buttonText = '결제하기';
      buttonHandler = () => {
        // 결제 완료 페이지로 이동
        setIsOpenFalse();
        navigate('/paymentcompleted');
      };
      break;
  }

  return (
    <div onClick={buttonHandler} className="buttonStyle w-24 h-10 flexCenter bg-slate-50">
      <p className="font- text-sm">{buttonText}</p>
    </div>
  );
};

export default PaymentButton;
