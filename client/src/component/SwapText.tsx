import gsap from 'gsap';
import {useEffect, useRef} from 'react';

//gspa 으로 텍스트리스트를 모두 겹쳐서 시간격차를 두고 보여주는 컴포넌트입니다.
export const SwapText = ({textList}: {textList: string[]}) => {
	const animateText = (elements: HTMLLIElement[]) => {
		const textAni = gsap.timeline({repeat: -1});
		for (let i = 0; i < elements.length; i++) {
			textAni.to(elements[i], 1, {
				opacity: 1,
				repeat: 1,
				yoyo: true,
				ease: 'power4.out',
				delay: 0,
				x: 0,
			});
		}
	};

	const containerRef = useRef<HTMLUListElement>(null);
	const elementsRef = useRef<HTMLLIElement[]>([]);

	useEffect(() => {
		if (containerRef.current) {
			const elements = containerRef.current.querySelectorAll('.item');
			elementsRef.current = Array.from(elements) as HTMLLIElement[]; // Explicitly cast to HTMLLIElement[]
			animateText(elementsRef.current); // Call animation on element load
		}
	}, [containerRef]);

	return (
		<div>
			<ul className="grid" ref={containerRef}>
				{textList.map((el, index) => (
					<li
						key={index} // Add key prop for performance
						className={`
                  item col-start-1 row-start-1 translate-x-5 opacity-0
                  ${index === 0 ? 'text-additional3' : ''}
                `}
					>
						{el}
					</li>
				))}
			</ul>
		</div>
	);
};
