import axios from 'axios';

const baseUrl = 'http://localhost:3001/user';

const login = async (email: string, password: string) => {
  try {
    const response = await axios.get(`${baseUrl}?email=${email}&password=${password}`);
    if (response.data.length !== 0) {
      sessionStorage.setItem('fakeToken', response.data[0].email);
      return { isSuccess: true, message: '로그인에 성공.', data: response.data };
    } else {
      return {
        isSuccess: false,
        message: '로그인에 실패했습니다. 이메일 또는 비밀번호를 확인하세요.',
      };
    }
    // if (response.status === 200 && response.data.token) {
    //   console.log('로그인 성공', response.data);
    //   sessionStorage.setItem('jwtToken', response.data.token);
    //   return { isSuccess: true, data: response.data };
    // } else {
    //   console.log('로그인에 실패했습니다. 이메일 또는 비밀번호를 확인하세요.', response);
    //   return {
    //     isSuccess: false,
    //     message: '로그인에 실패했습니다. 이메일 또는 비밀번호를 확인하세요.',
    //   };
    // }
  } catch (error) {
    return {
      isSuccess: false,
      message: '로그인에 실패했습니다. 네트워크를 확인하세요',
    };
  }
};

export default login;
