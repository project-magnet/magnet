import React from 'react';
import LoginButton from '../component/auth/LoginButton';
import { Link } from 'react-router-dom';

const LoginPage = () => {
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
      <section className=" ml-6 hidden md:block">
        <p className="text-7xl bg-blue-200   px-2 py-1 relative">
          쉽고, 간편하게
          <span className="absolute right-0 top-0 h-full w-[2px] bg-black animate-blink"></span>
        </p>
        <p className="text-lg bg-red text-slate-500 mt-3 px-2">
          커리어를 향해 나를 이끄는 곳, 마그넷
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

export default LoginPage;
