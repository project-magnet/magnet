import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import LoginEmail from './pages/LoginEmail';
import Header from './component/Header';
import Footer from './component/Footer';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/magnet" Component={Home} />
        <Route path="/login" Component={Login} />
        <Route path="/loginemail" Component={LoginEmail} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
