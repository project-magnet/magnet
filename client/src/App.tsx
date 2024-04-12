import Header from './component/common/Header';
import Footer from './component/common/Footer';
import {LoginPopup} from './component/auth/LoginPopup';
import {LoginPopupStore} from './store/LoginPopupStore';
import {Router} from './Router';
import {ToastPopup} from './component/common/ToastPopup';
import {ToastPopupStore} from './store/ToastPopupStore';

function App() {
	const isToastPopupOpen = ToastPopupStore(state => state.isOpen);
	const isLoginPopupOpen = LoginPopupStore(state => state.loginPopupIsOpen);

	return (
		<>
			{isToastPopupOpen && <ToastPopup />}
			{isLoginPopupOpen && <LoginPopup />}
			<Header />
			<Router />
			<Footer />
		</>
	);
}

export default App;
