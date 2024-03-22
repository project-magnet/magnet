import 'remixicon/fonts/remixicon.css';
import {useEffect, useState} from 'react';
import PopupStore from '../../store/PopupStore';
import {createMentor} from '../../api/mentor';
import {MemberStore} from '../../store/MemberStore';
import {LogoMagnet} from '../common/LogoMagnet';
import {CommonInput} from '../input/CommonInput';
import {SelectInput} from '../input/SelectInput';

export const MentorRegistPopup = () => {
	const setIsOpenFalse = PopupStore(state => state.setIsOpenFalse);
	const globalMember = MemberStore(state => state.globalMember);

	const [areAllInputsSelected, setAreAllInputsSelected] = useState(false);
	const [form, setForm] = useState({
		mentorName: globalMember.username,
		field: '',
		career: '',
		task: '',
		email: globalMember.email,
		phone: globalMember.phone,
		aboutMe: '',
		github: '',
	});

	const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
		if (e.target === e.currentTarget) {
			setIsOpenFalse();
		}
	};

	useEffect(() => {
		setAreAllInputsSelected(
			form.field !== '' && form.career !== '' && form.task !== '' && form.aboutMe !== '',
		);
	}, [form]);

	const handleSubmit = () => {
		const submitData = async () => {
			try {
				await createMentor(form);
				window.location.reload();
			} catch (error) {
				prompt('멘토등록에 실패했습니다.');
			}
		};
		submitData();
	};

	return (
		<div
			onClick={handleClick}
			className="flexCenter fixed top-0 z-20 size-full bg-black bg-opacity-30 backdrop-blur-sm"
		>
			<section className="flexCenter relative w-11/12 flex-col gap-5 rounded-md bg-white p-10 md:w-fit md:px-20 ">
				<div className="absolute right-1 top-1">
					<i
						onClick={handleClick}
						className="ri-close-line cursor-pointer text-2xl  text-slate-400 transition-colors duration-300 hover:text-black"
					></i>
				</div>
				<LogoMagnet word="MAGNET" />
				<div className="flexCol w-full gap-5 md:w-96">
					<SelectInput
						value={form.field}
						onChange={value => setForm({...form, field: value})}
						placeholder="대표 분야"
						options={[
							{value: '개발', label: '개발'},
							{value: '영업', label: '영업'},
							{value: '디자인', label: '디자인'},
						]}
						icon="walk-line"
					/>
					<SelectInput
						value={form.career}
						onChange={value => setForm({...form, career: value})}
						placeholder="경력"
						options={[
							{value: '1~3년 주니어', label: '1~3년 주니어'},
							{value: '4~8년 미들', label: '4~8년 미들'},
							{value: '9년 이상 시니어', label: '9년 이상 시니어'},
						]}
						icon="bar-chart-2-line"
					/>
					<CommonInput
						placeholder="현직"
						icon="building-line"
						value={form.task}
						onChange={value => setForm({...form, task: value})}
					/>

					<CommonInput
						placeholder="자기소개"
						icon="contacts-book-2-line"
						value={form.aboutMe}
						onChange={value => setForm({...form, aboutMe: value})}
					/>

					<CommonInput
						placeholder="Github ID"
						icon="github-fill"
						value={form.github}
						onChange={value => setForm({...form, github: value})}
					/>
				</div>

				<button
					onClick={areAllInputsSelected ? handleSubmit : () => {}}
					className={`buttonStylePrimary w-11/12 md:w-96 ${
						areAllInputsSelected ? 'bg-black' : 'bg-gray-300'
					}`}
					disabled={!areAllInputsSelected}
				>
					등록하기
				</button>
			</section>
		</div>
	);
};
