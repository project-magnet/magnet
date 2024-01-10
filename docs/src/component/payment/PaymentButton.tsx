type PaymentButtonProps = {
  type: 'previous' | 'next' | 'payment',
  pageNumber: number,
  setPageNumber: React.Dispatch<React.SetStateAction<number>>,
};

const PaymentButton: React.FC<PaymentButtonProps> = ({ type, pageNumber, setPageNumber }) => {
  let buttonText = '';
  let buttonHandler = () => {};

  switch (type) {
    case 'next':
      buttonText = '다음으로';
      buttonHandler = () => {
        setPageNumber(pageNumber + 1);
      };
      break;

    case 'previous':
      buttonText = '이전으로';
      buttonHandler = () => {
        setPageNumber(pageNumber - 1);
      };
      break;

    case 'payment':
      buttonText = '결제하기';
      buttonHandler = () => {
        window.location.href = '/paymentcompleted';
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
