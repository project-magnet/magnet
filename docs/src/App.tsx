import Header from './component/common/Header';
import BottomMenu from './component/common/BottomMenu';
import Footer from './component/common/Footer';
import { Router } from './Router';

function App() {
  return (
    <>
      <Header />
      <Router />
      <BottomMenu />
      <Footer />
    </>
  );
}

export default App;
