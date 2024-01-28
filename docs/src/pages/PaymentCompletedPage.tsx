import { Link } from 'react-router-dom';

const PaymentCompletedPage = () => {
  return (
    <div className=" w-full flexCenter flex-col gap-20 py-14">
      <section className="flexCol items-center gap-10">
        <i className="ri-calendar-check-line text-green-500 ri-7x" />
        <p className="text-3xl font-semibold">결제 완료</p>
        <p className="text-sm text-slate-400">빠른 시일내에 멘토님의 승인을 알려드릴게요!</p>
      </section>
      <Link to="/user" className=" px-6 py-2 buttonStyle">
        <p className="text-sm">나의 일정 보러 가기</p>
      </Link>
    </div>
  );
};

export default PaymentCompletedPage;
