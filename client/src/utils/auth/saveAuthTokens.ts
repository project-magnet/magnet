type AuthTokens = {
	Authorization: string;
	RefreshToken: string;
};

export const saveAuthTokens = ({Authorization, RefreshToken}: AuthTokens) => {
	try {
		sessionStorage.setItem('Authorization', Authorization);
		sessionStorage.setItem('RefreshToken', RefreshToken);
	} catch (error) {
		console.error('토큰저장 실패', error);
	}
};
