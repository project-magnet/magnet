import React from 'react';
import kakaoImage from '../../asset/logo/kakao.png';
import googleImage from '../../asset/logo/google.png';
import naverImage from '../../asset/logo/naver.png';
import {useOpenToastPopup} from '../../hooks/useOpenToastPopup';
// import {useNavigate} from 'react-router-dom';

interface LoginButtonProps {
	type: 'Google' | 'Kakao' | 'Naver';
}

const LoginButton: React.FC<LoginButtonProps> = ({type}) => {
	// const navigate = useNavigate();
	const openToastPopup = useOpenToastPopup();

	let buttonStyle = '';
	let buttonImage = '';
	// let linkTo = '';

	switch (type) {
		case 'Google':
			buttonStyle = 'bg-slate-100 text-black';
			buttonImage = googleImage;
			// 나중에 리다이렉션 추가해!
			// linkTo = '';
			break;
		case 'Kakao':
			buttonStyle = 'bg-yellow-400 text-black';
			buttonImage = kakaoImage;
			// 나중에 리다이렉션 추가해!
			// linkTo = '';
			break;
		case 'Naver':
			buttonStyle = 'bg-green-500 text-white';
			buttonImage = naverImage;
			// 나중에 리다이렉션 추가해!
			// linkTo = '';
			break;
	}

	return (
		<button onClick={() => openToastPopup({message: '수정중인 서비스 입니다!', type: 'warning'})}>
			<div className={`flexCenter h-full ${buttonStyle}  p-2 opacity-50 shadow-md`}>
				{buttonImage && <img src={buttonImage} alt={`${type} 이미지`} className="" />}
			</div>
		</button>
	);
};

export default LoginButton;
