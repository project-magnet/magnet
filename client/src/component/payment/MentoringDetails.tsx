import {MentoringStore} from '../../store/MentoringStore';

export const MentoringDetails = () => {
	const {mentoringData} = MentoringStore();

	return mentoringData ? (
		<div className="flexCol textSmall gap-1 rounded-3xl bg-slate-100 px-5 py-2">
			<div className=" flex items-center gap-1">
				<i className="ri-money-dollar-circle-line" />
				<p> 1회 : {mentoringData.pay}원</p>
			</div>
			<div className=" flex items-center gap-1">
				<i className="ri-calendar-event-line" />
				<p> 기간 : {mentoringData.period}</p>
			</div>
		</div>
	) : null;
};
