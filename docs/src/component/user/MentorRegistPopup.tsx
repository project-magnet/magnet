import 'remixicon/fonts/remixicon.css';
import {useEffect, useState} from 'react';
import PopupStore from '../../store/PopupStore';
import {createMentor} from '../../api/mentor';
import {MemberStore} from '../../store/MemberStore';
import {LogoMagnet} from '../common/LogoMagnet';

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
		github: 'no github',
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
					<div className="flexCenter w-full gap-2 border-b-2   p-3 focus-within:border-additional2 ">
						<i className={`ri-key-2-line ri-lg ${form.field ? 'text-black' : 'text-slate-400'}`} />
						<select
							className="flex-grow text-xs outline-none"
							value={form.field}
							onChange={e => setForm({...form, field: e.target.value})}
						>
							<option value="">분야</option>
							<option value="개발">개발</option>
							<option value="영업">영업</option>
							<option value="디자인">디자인</option>
						</select>
					</div>

					<div className="flexCenter w-full gap-2 border-b-2   p-3 focus-within:border-additional2 ">
						<i className={`ri-key-2-line ri-lg ${form.career ? 'text-black' : 'text-slate-400'}`} />
						<select
							className="flex-grow text-xs outline-none"
							value={form.career}
							onChange={e => setForm({...form, career: e.target.value})}
						>
							<option value="">경력 레벨</option>
							<option value="1~3년 주니어">1~3년 주니어</option>
							<option value="4~8년 미들">4~8년 미들</option>
							<option value="9년 이상 시니어">9년 이상 시니어</option>
						</select>
					</div>

					<div className="flexCenter w-full gap-2 border-b-2   p-3 focus-within:border-additional2 ">
						<i className={`ri-key-2-line ri-lg ${form.task ? 'text-black' : 'text-slate-400'}`} />
						<input
							className="flex-grow text-xs outline-none"
							placeholder="현직"
							value={form.task}
							onChange={e => setForm({...form, task: e.target.value})}
						/>
					</div>
					<div className="flexCenter w-full gap-2 border-b-2   p-3 focus-within:border-additional2 ">
						<i
							className={`ri-key-2-line ri-lg ${form.aboutMe ? 'text-black' : 'text-slate-400'}`}
						/>
						<input
							className="flex-grow text-xs outline-none"
							placeholder="자기소개"
							value={form.aboutMe}
							onChange={e => setForm({...form, aboutMe: e.target.value})}
						/>
					</div>
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
