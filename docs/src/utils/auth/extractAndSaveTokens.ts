import saveToken from './saveToken';

const extractAndSaveTokens = () => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const googleAccessToken = urlSearchParams.get('authorization');
  const googleRefreshToken = urlSearchParams.get('refresh-token');
  const googleMemberId = urlSearchParams.get('memberId');

  if (googleAccessToken && googleRefreshToken && googleMemberId) {
    saveToken('accessToken', googleAccessToken);
    saveToken('refreshToken', googleRefreshToken);
    saveToken('memberId', googleMemberId);
  } else {
    console.error('데이터가 유효하지 않습니다!: accessToken, refreshToken, memberId');
  }

  window.location.href = '/magnet';
};

export default extractAndSaveTokens;
