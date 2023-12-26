import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Header from './component/Header';
import Footer from './component/Footer';

function App() {
  return (
    <div className="w-screen">
      <Header />
      <Routes>
        <Route path="/magnet" Component={Home} />
        <Route path="/Login" Component={Login} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
