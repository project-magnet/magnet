import {useCallback, useEffect, useState} from 'react';
import {MyQuillComponent} from '../component/input/MyQuillComponent';
import {createMentoring} from '../api/mentoring';
import {useNavigate} from 'react-router-dom';
import {CommonInput} from '../component/input/CommonInput';
import {SelectInput} from '../component/input/SelectInput';
import {useOpenToastPopup} from '../hooks/useOpenToastPopup';
import {WarningMessage} from '../component/common/WarningMessage';

export const CreateMentoringPage = () => {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [pay, setPay] = useState('');
	const [period, setPeriod] = useState('');
	const [participants, setParticipants] = useState('');
	const [category, setCategory] = useState('');
	const [isFormValid, setIsFormValid] = useState(false);
	const navigate = useNavigate();
	const openToastPopup = useOpenToastPopup();

	const handleSubmit = async () => {
		const newForm = {
			title,
			content,
			pay,
			period,
			participants: Number(participants),
			category,
		};
		try {
			await createMentoring(newForm);
			openToastPopup({message: '멘토링 개설에 성공했습니다.', type: 'success'});
			navigate('/mentorlist');
		} catch (error) {
			openToastPopup({message: '멘토링 개설에 실패했습니다.', type: 'error'});
		}
	};

	const validateForm = useCallback(() => {
		const isValidDescription = content.trim().length > 0;
		const isValidTitle = title.trim().length > 0;
		const isValidPay = Number(pay) >= 1000 && Number(pay) <= 100000;
		const isValidParticipants = Number(participants) >= 1 && Number(participants) <= 30;
		const isValidPeriod = new Date(period).getMonth() >= new Date().getMonth();

		setIsFormValid(
			isValidDescription && isValidTitle && isValidPay && isValidParticipants && isValidPeriod,
		);
	}, [title, content, pay, participants, period]);

	useEffect(() => {
		validateForm();
	}, [validateForm]);

	return (
		<div className="flexCenter">
			<section className="flexCol gap-3 py-10">
				<div className="flexCenter">
					<p className="text-3xl font-semibold">멘토링 정보 입력</p>
				</div>
				<SelectInput
					placeholder="멘토링 분야"
					icon="chat-smile-3-line"
					value={category}
					onChange={value => setCategory(value)}
					options={[
						{value: 'WEB_DESIGN', label: '웹 디자인'},
						{value: 'UI_UX', label: 'UI/UX'},
						{value: 'PRODUCT_MANAGER', label: '프로덕트 매니저'},
						{value: 'BACKEND', label: '백엔드'},
						{value: 'FRONTEND', label: '프론트엔드'},
						{value: 'DEVOPS', label: '데브옵스'},
						{value: 'DATA_ENGINEER', label: '데이터 엔지니어'},
						{value: 'SERVER_ENGINEER', label: '서버 엔지니어'},
						{value: 'AI', label: 'AI'},
					]}
				/>
				<CommonInput
					placeholder="멘토링 제목"
					icon="edit-box-line"
					value={title}
					onChange={value => setTitle(value)}
				/>

				<MyQuillComponent value={content} setValue={setContent} />

				<CommonInput
					placeholder="멘토링 진행 월"
					value={period}
					onChange={value => setPeriod(value)}
					type="month"
					icon="calendar-line"
				/>
				<WarningMessage
					message="과거의 시간은 선택할 수 없습니다."
					isSuccess={period.length === 0 || new Date(period).getMonth() >= new Date().getMonth()}
				/>

				<CommonInput
					type="number"
					placeholder="결제 비용"
					icon="money-dollar-circle-line"
					value={pay.toString()}
					onChange={value => setPay(value)}
				/>
				<WarningMessage
					message="결제 금액은 1,000원부터 100,000원까지 가능해요."
					isSuccess={pay.length === 0 || (Number(pay) >= 1000 && Number(pay) <= 100000)}
				/>

				<CommonInput
					type="number"
					placeholder="모집 인원"
					icon="group-line"
					value={participants.toString()}
					onChange={value => setParticipants(value)}
				/>
				<WarningMessage
					message="모집 인원은 1명부터 30명까지 가능해요."
					isSuccess={
						participants.length === 0 || (Number(participants) >= 1 && Number(participants) <= 30)
					}
				/>
				<button className={`buttonStylePrimary`} onClick={handleSubmit} disabled={!isFormValid}>
					개설하기
				</button>
			</section>
		</div>
	);
};

export default CreateMentoringPage;
