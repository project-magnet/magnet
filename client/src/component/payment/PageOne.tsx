import {useEffect, useState} from 'react';
import {getMentoring, getMentoringData} from '../../api/mentoring';
import {useLocation} from 'react-router-dom';
import {LodingContainer} from '../common/LoadingContainer';

export const PageOne = () => {
	const [mentoringData, setMentoringData] = useState<getMentoringData | null>(null);
	const location = useLocation();

	// 멘토링 정보를 불러온다.
	useEffect(() => {
		const fetchMentoringData = async () => {
			try {
				const searchParams = new URLSearchParams(location.search);
				const mentoringid = searchParams.get('mentoringid');
				const data: getMentoringData = await getMentoring(mentoringid ? Number(mentoringid) : 0);
				setMentoringData(data);
			} catch (error) {
				console.error('멘토링 정보를 불러오는 동안 오류가 발생했습니다:', error);
			}
		};
		fetchMentoringData();
	}, [location.search]);

	return mentoringData ? (
		<>
			<div className="textSmall flexCol gap-1 text-secondary *:flex *:gap-1">
				<div>
					<i className="ri-building-line" />
					<p className="truncate text-additional3">{`${mentoringData.task}`}</p>
				</div>
				<div>
					<i className="ri-bar-chart-2-line" />
					<p className="runcate">{`${mentoringData.career}`}</p>
				</div>
				<div>
					<i className="ri-walk-line " />
					<p className="truncate">{`${mentoringData.field}`} 직무</p>
				</div>
			</div>
			<div className="h-[1px] w-full border" />
			<p className="textLarge font-bold">{mentoringData.title}</p>
			<div
				className="textBase min-h-40 text-pretty"
				dangerouslySetInnerHTML={{__html: mentoringData.content}}
			/>
		</>
	) : (
		<LodingContainer />
	);
};
