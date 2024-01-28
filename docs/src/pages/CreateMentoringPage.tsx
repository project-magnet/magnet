import React, {useEffect, useState} from 'react';
import {MyQuillComponent} from '../component/MyQuillComponent';

export const CreateMentoringPage: React.FC = () => {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [cost, setCost] = useState<number>(1000);
	const [participants, setParticipants] = useState(1);
	const [date, setDate] = useState('');
	const [isFormValid, setIsFormValid] = useState(false);

	useEffect(() => {
		setIsFormValid(
			title.length > 0 &&
				description.length > 0 &&
				cost.toString().length > 0 &&
				participants.toString().length > 0 &&
				date.length > 0,
		);
	}, [title, description, cost, participants, date]);

	// 날짜 선택 시 과거의 날짜는 선택할 수 없도록 합니다.
	useEffect(() => {
		const value = new Date(date);
		if (value < new Date()) {
			alert('과거의 날짜는 선택할 수 없습니다.');
			setDate('');
		}
	}, [date]);

	// 인원은 1명 이상 30명 이하로 제한합니다.
	useEffect(() => {
		const value = Number(participants);
		if (value < 1 || value > 30) {
			alert('인원은 1명 이상 30명 이하로 제한됩니다.');
			setParticipants(1);
		}
	}, [participants]);

	const handleSubmit = () => {
		console.log(title, description, cost, participants, date);
	};

	return (
		<div className="flexCenter">
			<section className="flexCol gap-5 py-10">
				<div className="flexCenter">
					<p className="text-3xl font-semibold">멘토링 정보 입력</p>
				</div>
				<div className="inputStyle">
					<p>제목</p>
					<input
						type="text"
						value={title}
						onChange={e => setTitle(e.target.value)}
						placeholder="제목을 입력해 주세요."
					/>
				</div>

				<div className="inputStyle">
					<p>소개내용</p>
					<MyQuillComponent value={description} setValue={setDescription} />
				</div>

				<div className="inputStyle">
					<p>비용(원)</p>
					<input
						type="number"
						value={cost}
						onChange={e => setCost(Number(e.target.value))}
						placeholder="비용"
						step={1000}
						pattern="[0-9]*"
						min={1000}
					/>
				</div>
				<div className="inputStyle">
					<p>날짜</p>
					<input type="month" value={date} onChange={e => setDate(e.target.value)} />
				</div>
				<div className="inputStyle">
					<p>인원</p>
					<input
						type="number"
						min={1}
						max={30}
						value={participants}
						onChange={e => setParticipants(Number(e.target.value))}
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
