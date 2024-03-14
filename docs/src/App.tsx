import Header from './component/common/Header';
import BottomMenu from './component/common/BottomMenu';
import Footer from './component/common/Footer';
import {LoginPopup} from './component/auth/LoginPopup';
import {LoginPopupStore} from './store/LoginPopupStore';
import {Router} from './Router';

function App() {
	const isLoginPopupOpen = LoginPopupStore(state => state.loginPopupIsOpen);
	return (
		<>
			{isLoginPopupOpen && <LoginPopup />}
			<Header />
			<Router />
			<BottomMenu />
			<Footer />
		</>
	);
}

export default App;
