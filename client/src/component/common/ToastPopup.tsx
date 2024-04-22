import {ToastPopupStore} from '../../store/ToastPopupStore';

export const ToastPopup = () => {
	// ToastPopupStore를 사용하여 상태를 관리
	const {isOpen, message, type} = ToastPopupStore();

	const getIconAndColor = () => {
		switch (type) {
			case 'success':
				return {icon: 'check-line', color: 'text-green-500'};
			case 'error':
				return {icon: 'error-warning-fill', color: 'text-red-500'};
			case 'warning':
				return {icon: 'error-warning-line', color: 'text-yellow-500'};
		}
	};

	const {icon, color} = getIconAndColor();

	return (
		<>
			{isOpen && (
				<aside className="fixed left-1/2 top-3 z-50 w-10/12 -translate-x-1/2 sm:w-1/2">
					<div
						className={`flexCenter h-12 animate-toastPopupMove gap-2 rounded-md bg-slate-50 drop-shadow-xl ${color}`}
					>
						<i className={`ri-${icon} ri-2x`} />
						<p>{message}</p>
					</div>
				</aside>
			)}
		</>
	);
};
