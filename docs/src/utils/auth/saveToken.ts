const saveToken = (key: string, value: string) => {
  try {
    sessionStorage.setItem(key, value);
  } catch (error) {
    console.error(`키 "${key}"에 대한 세션 저장 중 오류 발생:`, error);
  }
};

export default saveToken;
