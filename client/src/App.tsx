import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Header from './component/Header';

function App() {
  return (
    <div className="h-[200vh]">
      <Header />
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/Login" Component={Login} />
      </Routes>
    </div>
  );
}

export default App;
