import {useCallback} from 'react';
import {ToastPopupStore} from '../store/ToastPopupStore';

type ToastPopupProps = {
	message: string;
	type: 'success' | 'error' | 'warning';
};

export const useOpenToastPopup = () => {
	const {setIsOpenTrue, setIsOpenFalse, setMessage, setType} = ToastPopupStore();

	const showToastPopup = useCallback(
		({message, type}: ToastPopupProps) => {
			setMessage(message);
			setType(type);
			// 항상 토스트가 닫혀있는 상태로 시작해야 하지만 토스트가 열리는 상태로 시작하면 3초 후에 자동으로 닫히지 않고 연장됩니다.
			setIsOpenTrue();

			// setTimeout 함수를 호출하고 타이머 ID를 반환합니다.
			const timerId = setTimeout(() => {
				setIsOpenFalse();
			}, 3000);

			// 타이머 ID를 반환합니다.
			return timerId;
		},
		[setIsOpenTrue, setIsOpenFalse, setMessage, setType],
	);

	return showToastPopup; // 토스트 팝업을 보여주는 함수와 현재 보이기/숨기기 상태 반환
};
