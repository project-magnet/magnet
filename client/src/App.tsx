import Header from './component/common/Header';
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
			<Footer />
		</>
	);
}

export default App;
