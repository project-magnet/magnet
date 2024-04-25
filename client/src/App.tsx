import Header from './component/common/Header';
import Footer from './component/common/Footer';
import {Router} from './Router';
import {ToastPopup} from './component/common/ToastPopup';
import {Modal} from './component/common/Modal';

function App() {
	return (
		<>
			<Modal />
			<ToastPopup />
			<Header />
			<Router />
			<Footer />
		</>
	);
}

export default App;
