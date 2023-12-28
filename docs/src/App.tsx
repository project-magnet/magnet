import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import LoginEmailPage from './pages/LoginEmailPage';
import Header from './component/Header';
import Footer from './component/Footer';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/magnet" Component={HomePage} />
        <Route path="/login" Component={LoginPage} />
        <Route path="/loginemail" Component={LoginEmailPage} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
