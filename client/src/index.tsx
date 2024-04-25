import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'; // * BrowserRouter 불러오기
import App from './App';
import './styles/tailwind.css';
import ScrollToTop from './utils/common/scrollToTop';
import 'remixicon/fonts/remixicon.css';

// * App 을 BrowserRouter 로 감싸기
ReactDOM.render(
	<BrowserRouter>
		<ScrollToTop />
		<App />
	</BrowserRouter>,
	document.getElementById('root'),
);
