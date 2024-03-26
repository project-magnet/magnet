export const removeToken = () => {
	if (sessionStorage.getItem('Authorization')) {
		sessionStorage.removeItem('Authorization');
	}
	if (sessionStorage.getItem('RefreshToken')) {
		sessionStorage.removeItem('RefreshToken');
	}
};
