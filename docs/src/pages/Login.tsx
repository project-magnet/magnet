import React from 'react';

const Login = () => {
  const redirectToGoogleOAuth = () => {
    window.location.href =
      'https://accounts.google.com/o/oauth2/auth?' +
      'client_id=55616367009-acbdl0au5jp7o5m4f09thkt3dn9ies32.apps.googleusercontent.com&' +
      'redirect_uri=http://localhost:3000/login&' +
      'response_type=code&' +
      'scope=https://www.googleapis.com/auth/userinfo.email';
  };
  return (
    <div className="App">
      <header className="App-header">
        {/* 버튼을 클릭하면 Google OAuth로 리디렉션 */}
        <button onClick={redirectToGoogleOAuth}>Google 로그인</button>
      </header>
    </div>
  );
};

export default Login;
