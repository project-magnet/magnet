import {create} from 'zustand';

type useStoreProps = {
	loginPopupIsOpen: boolean;
	setLoginPopupIsOpenTrue: () => void;
	setLoginPopupIsOpenFalse: () => void;
};

export const LoginPopupStore = create<useStoreProps>(set => ({
	loginPopupIsOpen: false,
	setLoginPopupIsOpenTrue: () => set({loginPopupIsOpen: true}),
	setLoginPopupIsOpenFalse: () => set({loginPopupIsOpen: false}),
}));
