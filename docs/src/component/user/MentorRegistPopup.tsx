import 'remixicon/fonts/remixicon.css';
import {useEffect, useState} from 'react';
import PopupStore from '../../store/PopupStore';
import {useLocation} from 'react-router-dom';

export const MentorRegistPopup = () => {
	const setIsOpenFalse = PopupStore(state => state.setIsOpenFalse);
	const location = useLocation();

	const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
		// 팝업 영역 자체를 클릭한 경우에만 팝업을 닫습니다.
		e.stopPropagation();
		if (e.target === e.currentTarget) {
			setIsOpenFalse();
		}
	};

	const handleSubmit = () => {
		// 세션스토리지의 fakeToken을 "mentor" 로 변환합니다.
		const fakeToken = sessionStorage.getItem('fakeToken');
		if (fakeToken) {
			sessionStorage.setItem('fakeToken', 'mentor');
			window.location.reload();
		}
	};

	const [selectedField, setSelectedField] = useState('');
	const [selectedExperience, setSelectedExperience] = useState('');
	const [currentCompany, setCurrentCompany] = useState('');
	const [areAllInputsSelected, setAreAllInputsSelected] = useState(false);

	useEffect(() => {
		setAreAllInputsSelected(
			selectedField.trim() !== '' &&
				selectedExperience.trim() !== '' &&
				currentCompany.trim() !== '',
		);
	}, [selectedField, selectedExperience, currentCompany]);

	const submitDataToServer = () => {
		if (areAllInputsSelected) {
			console.log(selectedExperience, selectedField, currentCompany);
		} else {
			// 모든 입력이 선택되지 않았을 때의 처리
			console.log('All inputs must be selected');
		}
	};

	return (
		<div
			onClick={handleClick}
			className="flexCenter w-full h-full fixed bg-opacity-30 bg-black z-10 top-0"
		>
			<section className="flexCol w-full h-full mt-40 p-0 sm:p-10 sm:mt-0 sm:h-fit sm:w-fit bg-white rounded-xl z-20 gap-5 overflow-y-auto">
				<div className="flex justify-end items-center">
					<i
						onClick={handleClick}
						className="ri-close-line text-2xl cursor-pointer text-slate-400"
					></i>
				</div>
				<div className="w-full flex justify-center">
					<p className="text-2xl font-semibold">직무 정보</p>
				</div>
				<div className="flexCol  gap-5 inputStyle">
					<div>
						<p>경력</p>
						<select
							className="border w-full p-2 rounded-md"
							value={selectedField}
							onChange={e => setSelectedField(e.target.value)}
						>
							<option value="">선택하세요</option>
							<option value="개발">개발</option>
							<option value="영업">영업</option>
							<option value="디자인">디자인</option>
						</select>
					</div>
					<div>
						<p>경력 레벨</p>
						<select
							className="border w-full p-2 rounded-md"
							value={selectedExperience}
							onChange={e => setSelectedExperience(e.target.value)}
						>
							<option value="">선택하세요</option>
							<option value="1~3년 주니어">1~3년 주니어</option>
							<option value="4~8년 미들">4~8년 미들</option>
							<option value="9년 이상 시니어">9년 이상 시니어</option>
						</select>
					</div>
					<div>
						<p>현직 회사</p>
						<input value={currentCompany} onChange={e => setCurrentCompany(e.target.value)} />
					</div>
				</div>

				<div className="flex justify-center">
					{/* 버튼을 활성화하려면 areAllInputsSelected가 true일 때만 클릭 이벤트를 활성화 */}
					<button
						onClick={areAllInputsSelected ? handleSubmit : () => {}}
						className={`buttonStyle py-2 px-6 text-white ${
							areAllInputsSelected ? 'bg-black' : 'bg-gray-300'
						}`}
						disabled={!areAllInputsSelected} // 버튼 비활성화를 위한 disabled 속성 추가
					>
						등록하기
					</button>
				</div>
			</section>
		</div>
	);
};
