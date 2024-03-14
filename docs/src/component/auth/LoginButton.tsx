import React from 'react';
import kakaoImage from '../../asset/logo/kakao.png';
import googleImage from '../../asset/logo/google.png';
import naverImage from '../../asset/logo/naver.png';
import {Link} from 'react-router-dom';

interface LoginButtonProps {
	type: 'Email' | 'Google' | 'Kakao' | 'Naver';
}

const LoginButton: React.FC<LoginButtonProps> = ({type}) => {
	let buttonStyle = '';
	let buttonText = '';
	let buttonImage = '';
	let linkTo = '';

	switch (type) {
		case 'Email':
			buttonStyle = 'bg-blue-500 text-white';

			linkTo = '/loginemail';
			break;
		case 'Google':
			buttonStyle = 'bg-slate-100 text-black';

			buttonImage = googleImage;
			// 나중에 리다이렉션 추가해!
			linkTo = '';
			break;
		case 'Kakao':
			buttonStyle = 'bg-yellow-400 text-black';

			buttonImage = kakaoImage;
			// 나중에 리다이렉션 추가해!
			linkTo = '';
			break;
		case 'Naver':
			buttonStyle = 'bg-green-500 text-white';

			buttonImage = naverImage;
			// 나중에 리다이렉션 추가해!
			linkTo = '';
			break;
		default:
			buttonStyle = 'bg-blue-500 text-white';

			linkTo = '/loginemail';
			break;
	}

	return (
		<Link to={linkTo}>
			<div className={`flexCenter h-full ${buttonStyle} p-2 shadow-md`}>
				{buttonImage && <img src={buttonImage} alt={`${type} 이미지`} className="" />}
			</div>
		</Link>
	);
};

export default LoginButton;
