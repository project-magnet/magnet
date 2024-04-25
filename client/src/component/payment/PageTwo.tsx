import {useEffect, useState} from 'react';
import {CommonInput} from '../input/CommonInput';

export const PageTwo = () => {
	const [message, setMessage] = useState<string>('');
	const [phone, setPhone] = useState<string>('');
	const [email, setEmail] = useState<string>('');

	// input이 모두 채워졌는지 확인
	useEffect(() => {
		sessionStorage.setItem('phone', phone);
		sessionStorage.setItem('message', message);
		sessionStorage.setItem('email', email);
	}, [phone, message, email]);

	return (
		<>
			<article className="textlarge animate-fadeInMoveDown rounded-xl bg-slate-100 p-5 text-additional3">
				멘토링 신청을 위해 신중하게 작성해 주세요.
			</article>
			<CommonInput
				placeholder="연락 가능한 연락처를 입력해 주세요"
				onChange={setPhone}
				value={phone}
				icon="phone-line"
			/>
			<CommonInput
				placeholder="연락 가능한 이메일을 입력해 주세요"
				onChange={setEmail}
				value={email}
				icon="mail-line"
			/>
			<textarea
				className="min-h-52 w-full resize-none rounded-md border-2 p-2 text-sm"
				placeholder="멘토에게 전달사항 (멘토링 신청 이유, 질문 등)"
				onChange={e => setMessage(e.target.value)}
				value={message}
			></textarea>
		</>
	);
};
