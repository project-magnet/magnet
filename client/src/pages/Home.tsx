import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="text-3xl font-bold underline text-yellow-500">
      <h1>홈</h1>
      <p>이곳은 홈이에요. 가장 먼저 보여지는 페이지죠.</p>
      <Link to="/login">로그인으로</Link>
    </div>
  );
};

export default Home;
