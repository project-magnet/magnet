import {useEffect, useState} from 'react';
import {MyQuillComponent} from '../component/input/MyQuillComponent';
import {createMentoring} from '../api/mentoring';
import {useNavigate} from 'react-router-dom';
import {CommonInput} from '../component/input/CommonInput';
import {SelectInput} from '../component/input/SelectInput';
import {NumberInput} from '../component/input/NumberInput';
import {PeriodInput} from '../component/input/PeriodInpit';

export const CreateMentoringPage = () => {
	const [form, setForm] = useState({
		title: '',
		content: '',
		pay: '',
		period: '',
		participants: '',
		category: '',
	});
	const [description, setDescription] = useState('');
	const [isFormValid, setIsFormValid] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		setIsFormValid(
			description.length > 0 &&
				form.title.length > 0 &&
				form.pay.length > 0 &&
				form.period.length > 0 &&
				form.participants.length > 0,
		);
	}, [form, description]);

	const handleSubmit = () => {
		const newForm = {
			...form,
			content: description,
			participants: Number(form.participants),
		};
		const submitData = async () => {
			try {
				await createMentoring(newForm);
				navigate('/mentorlist');
			} catch (error) {
				prompt('멘토링 생성에 실패했습니다.');
			}
		};
		submitData();
	};

	return (
		<div className="flexCenter">
			<section className="flexCol gap-5 py-10">
				<div className="flexCenter">
					<p className="text-3xl font-semibold">멘토링 정보 입력</p>
				</div>
				<SelectInput
					placeholder="멘토링 분야"
					icon="chat-smile-3-line"
					value={form.category}
					onChange={value => setForm({...form, category: value})}
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
					value={form.title}
					onChange={value => setForm({...form, title: value})}
				/>
				<div className="inputStyle">
					<p>소개내용</p>
					<MyQuillComponent value={description} setValue={setDescription} />
				</div>

				<PeriodInput value={form.period} onChange={value => setForm({...form, period: value})} />

				<NumberInput
					placeholder="신청비용"
					icon="money-dollar-circle-line"
					value={form.pay}
					onChange={value => setForm({...form, pay: value})}
					step={1000}
					min={1000}
					max={1000000}
				/>
				<NumberInput
					placeholder="모집인원"
					icon="group-line"
					value={form.participants.toString()}
					onChange={value => setForm({...form, participants: value})}
					step={1}
					min={1}
					max={30}
				/>

				<button className={`buttonStylePrimary`} onClick={handleSubmit} disabled={!isFormValid}>
					개설하기
				</button>
			</section>
		</div>
	);
};

export default CreateMentoringPage;
