import {useEffect, useState} from 'react';
import {MyQuillComponent} from '../component/MyQuillComponent';
import {createMentoring} from '../api/mentoring';
import {useNavigate} from 'react-router-dom';
import {CommonInput} from '../component/common/CommonInput';

export const CreateMentoringPage = () => {
	const [form, setForm] = useState({
		title: '',
		content: '',
		pay: '',
		period: '',
		participants: 1,
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
				form.participants > 0,
		);
	}, [form, description]);

	// 날짜 선택 시 과거의 날짜는 선택할 수 없도록 합니다.
	useEffect(() => {
		const value = new Date(form.period);
		if (value < new Date()) {
			alert('과거의 날짜는 선택할 수 없습니다.');
			setForm({...form, period: ''});
		}
	}, [form.period]);

	// 인원은 1명 이상 30명 이하로 제한합니다.
	useEffect(() => {
		const value = Number(form.participants);
		if (value < 1 || value > 30) {
			alert('인원은 1명 이상 30명 이하로 제한됩니다.');
			setForm({...form, participants: 1});
		}
	}, [form.participants]);

	useEffect(() => {
		setForm({...form, content: description});
	}, [description]);

	const handleSubmit = () => {
		const submitData = async () => {
			try {
				await createMentoring(form);
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

				<div className="inputStyle">
					<p>분야</p>
					<select
						className="w-full rounded-md border p-2"
						value={form.category}
						onChange={e => setForm({...form, category: e.target.value})}
					>
						<option value="">선택하세요</option>
						<option value="DEVELOPMENT">개발</option>
						<option value="MARKETING">마케팅</option>
						<option value="PRODUCT_MANAGER">프로덕트 매니저</option>
						<option value="BACKEND">백엔드</option>
						<option value="FRONTEND">프론트엔드</option>
						<option value="DEVOPS">데브옵스</option>
						<option value="DATA_ENGINEER">데이터 엔지니어</option>
						<option value="SERVER_ENGINEER">서버 엔지니어</option>
						<option value="AI">AI</option>
					</select>
				</div>

				<CommonInput
					placeholder="제목을 입력해 주세요."
					icon="edit-box-line"
					value={form.title}
					onChange={value => setForm({...form, title: value})}
				/>

				<div className="inputStyle">
					<p>소개내용</p>
					<MyQuillComponent value={description} setValue={setDescription} />
				</div>

				<div className="inputStyle">
					<p>비용(원)</p>
					<input
						type="number"
						value={form.pay}
						onChange={e => setForm({...form, pay: e.target.value})}
						placeholder="비용"
						step={1000}
						pattern="[0-9]*"
						min={1000}
					/>
				</div>
				<div className="inputStyle">
					<p>날짜</p>
					<input
						type="month"
						value={form.period}
						onChange={e => setForm({...form, period: e.target.value})}
					/>
				</div>
				<div className="inputStyle">
					<p>인원</p>
					<input
						type="number"
						min={1}
						max={30}
						value={form.participants}
						onChange={e => setForm({...form, participants: Number(e.target.value)})}
					/>
				</div>
				<button
					className={`buttonStyle py-2 ${
						isFormValid ? 'hover:opacity-80' : 'opacity-20'
					} bg-black text-white`}
					onClick={handleSubmit}
					disabled={!isFormValid}
				>
					개설하기
				</button>
			</section>
		</div>
	);
};

export default CreateMentoringPage;
