import 'remixicon/fonts/remixicon.css';
import {useEffect, useState} from 'react';
import PopupStore from '../../store/PopupStore';
import {createMentor} from '../../api/mentor';
import {MemberStore} from '../../store/MemberStore';
import {LogoMagnet} from '../common/LogoMagnet';
import {CommonInput} from '../input/CommonInput';
import {SelectInput} from '../input/SelectInput';
import {PopupCloseButton} from '../common/PopupCloseButton';

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

	useEffect(() => {
		document.body.style.overflow = 'hidden'; // 페이지 스크롤 방지
		return () => {
			document.body.style.overflow = 'auto'; // 컴포넌트 언마운트 시 스크롤 허용
		};
	}, []);

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
			<section className="flexCenter relative w-full flex-col gap-10 rounded-md bg-white py-10 md:w-fit  md:p-20 ">
				<PopupCloseButton handleClick={handleClick} />
				<LogoMagnet word="MAGNET" />
				<article className="textlarge w-11/12 animate-fadeInMoveDown rounded-xl bg-slate-100 p-5 text-additional3 md:w-96">
					마그넷의 멘토가 되어달라는 문구.
				</article>
				<div className="flexCol w-11/12 gap-5 md:w-96">
					<SelectInput
						value={form.field}
						onChange={value => setForm({...form, field: value})}
						placeholder="대표 분야"
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
						placeholder="간단 자기소개"
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
					className={`buttonStylePrimary w-11/12 md:w-96`}
					disabled={!areAllInputsSelected}
				>
					등록하기
				</button>
			</section>
		</div>
	);
};
