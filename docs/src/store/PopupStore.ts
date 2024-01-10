import { create } from 'zustand';

type useStoreProps = {
  isOpen: boolean,
  setIsOpenTure: () => void,
  setIsOpenFalse: () => void,
};

const PopupStore =create<useStoreProps >()(set =>({
  isOpen: false,
  setIsOpenTure: () => set((state: { isOpen: boolean }) => ({ isOpen: true })),
  setIsOpenFalse: () => set((state: { isOpen: boolean }) => ({ isOpen: false })),
  }));

export default PopupStore;