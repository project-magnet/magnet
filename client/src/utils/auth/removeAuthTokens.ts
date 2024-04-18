export const removeAuthTokens = () => {
	sessionStorage.removeItem('Authorization');
	sessionStorage.removeItem('RefreshToken');
};
