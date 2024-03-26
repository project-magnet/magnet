import extractAndSaveTokens from '../utils/auth/extractAndSaveTokens';

const Authpage = () => {
  setTimeout(() => {
    extractAndSaveTokens();
  }, 2000);

  return <>토큰 가져오는 중... 작업이 끝나면 메인페이지로 이동!</>;
};
export default Authpage;
