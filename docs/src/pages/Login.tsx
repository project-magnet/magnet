import React from 'react';
import LoginButton from '../component/LoginButton';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="w-screen h-[80vh] flexCenter">
      <section className="w-80 h-[350px] container flexCol items-center justify-evenly">
        <Link to="/loginemail">
          <LoginButton />
        </Link>
        <LoginButton />
        <LoginButton />
        <LoginButton />
        <LoginButton />
      </section>
      <section className=" ml-10 hidden md:block">
        <p className="text-7xl bg-blue-200">쉽게, 간편하게</p>
        <p className="text-5xl text-slate-500 mt-20">
          마그넷과 함께 <br />
          커리어 여정을 <br />
          떠나 볼까요!
        </p>
      </section>
    </div>
  );
};

// const Login = () => {
//   const redirectToGoogleOAuth = () => {
//     window.location.href =
//       'https://accounts.google.com/o/oauth2/auth?' +
//       'client_id=55616367009-acbdl0au5jp7o5m4f09thkt3dn9ies32.apps.googleusercontent.com&' +
//       'redirect_uri=http://localhost:3000/login&' +
//       'response_type=code&' +
//       'scope=https://www.googleapis.com/auth/userinfo.email';
//   };
//   return (
//     <div className="App">
//       <header className="App-header">
//         {/* 버튼을 클릭하면 Google OAuth로 리디렉션 */}
//         <button onClick={redirectToGoogleOAuth}>Google 로그인</button>
//       </header>
//     </div>
//   );
// };

export default Login;
