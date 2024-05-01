import {useEffect, useState} from 'react';
import ModalStore from '../../store/ModalStore';
import {createMentor} from '../../api/mentor';
import {MemberStore} from '../../store/MemberStore';
import {CommonInput} from '../input/CommonInput';
import {SelectInput} from '../input/SelectInput';
import {useOpenToastPopup} from '../../hooks/useOpenToastPopup';
import {getMember} from '../../api/member';

export const MentorRegistModal = () => {
	const {closeModal} = ModalStore();
	const {globalMember} = MemberStore();
	const openToast = useOpenToastPopup();

	const [areAllInputsSelected, setAreAllInputsSelected] = useState(false);
	const [form, setForm] = useState({
		mentorName: '',
		field: '',
		career: '',
		task: '',
		email: '',
		phone: '',
		aboutMe: '',
		github: '',
	});

	useEffect(() => {
		setAreAllInputsSelected(
			form.field !== '' && form.career !== '' && form.task !== '' && form.aboutMe !== '',
		);
	}, [form]);

	const handleSubmit = () => {
		const submitData = async () => {
			try {
				const newForm = {
					...form,
					mentorName: globalMember?.username || '',
					email: globalMember?.email || '',
					phone: globalMember?.phone || '',
				};
				await createMentor(newForm);
				await getMember();
				closeModal();
				openToast({message: '멘토등록이 완료되었습니다.', type: 'success'});
			} catch (error) {
				console.error('멘토등록 실패', error);
				openToast({message: '멘토등록에 실패했습니다.', type: 'error'});
			}
		};
		globalMember
			? submitData()
			: openToast({message: '로그인 상태를 확인해주세요.', type: 'warning'});
	};

	return (
		<>
			<article className="textlarge w-11/12 animate-fadeInMoveDown rounded-xl bg-slate-100 p-5 text-additional3 md:w-96">
				마그넷의 멘토가 되어 주세요!
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
		</>
	);
};
