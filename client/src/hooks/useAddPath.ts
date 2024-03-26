import {useLocation, useNavigate} from 'react-router-dom';

/**
 * 현재 경로의 쿼리 문자열에 새로운 파라미터를 추가하거나 변경하여 새로운 경로로 이동하는 함수를 반환합니다.
 */
export const useAddPath = () => {
	const navigate = useNavigate();
	const location = useLocation();

	/**
	 * 현재 경로의 쿼리 문자열에 새로운 파라미터를 추가하거나 변경하여 새로운 경로로 이동하는 기능을 제공합니다.
	 * @param {string} newPath 쿼리 문자열에 추가하거나 변경할 파라미터와 값을 전달합니다. '='으로 구분합니다.
	 * @example addPath('page=2') addPath('category=Food')
	 */
	const addPath = (newPath: string) => {
		const searchParams = new URLSearchParams(location.search);
		// newPath를 '='을 기준으로 파라미터와 값을 분리합니다.
		const [param, value] = newPath.split('=');

		if (searchParams.has(param)) {
			searchParams.set(param, value);
		} else {
			searchParams.append(param, value);
		}

		navigate(`${location.pathname}?${searchParams.toString()}`);
	};

	return addPath;
};
