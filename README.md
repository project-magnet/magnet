
<img width="1410" alt="1" src="https://github.com/qpwoei0123/magnet/assets/85989215/587ffab7-4f26-4def-9802-454e05ec9397">

### 멘토와 멘티를 이어주는 멘토링 서비스.

`프로젝트 기간` : 2023.12 ~ 2024.05

`배포링크` : https://project-magnet.site/
<br/>


## 스택

- React
- TypeScript
- Zustand
- TailwindCss
- axios
  
<br/>

## 기여한 부분

- 프론트엔드 전체
- 웹사이트의 전반적인 디자인과 UI/UX를 담당
    - 사용자의 경로를 인식하기 위해 네비게이션은 경로를 기반으로 아이콘과 색상을 변경함
    - 반응형으로 제작하여 모든 디바이스에서 안정적임을 보장함
    - 클릭 가능한 거의 모든 요소에 hover와 active를 적극 활용하여 웹의 커서 및 모바일의 터치 상황에서도 상호작용이 가능하도록 함
    - 디자인 토큰을 사용하여 일관된 디자인을 유지하고 개발 시간을 단축함
    - GSAP 라이브러리를 도입하여 애니메이션을 쉽게 구현함
<br/>

## 프로토 타입
<img width="800" alt="2" src="https://github.com/qpwoei0123/magnet/assets/85989215/bde91724-9fa4-42be-ba9f-624e33ba548f">
<br/>

## 주요개발 내용

### **서비스의 인상을 남기기 위한 사용자 인터랙션 구현.**
![3](https://github.com/qpwoei0123/magnet/assets/85989215/05cef95a-dcd5-4584-89ba-bf5a8c353269)
![4](https://github.com/qpwoei0123/magnet/assets/85989215/e7020c26-c737-463b-bd3e-8edb4d6503f8)
![5](https://github.com/qpwoei0123/magnet/assets/85989215/dfdbfa9b-04f1-4ab0-baae-cdcdb8b7682c)

- 입력에 따라 아이콘의 변화와 같은 다양한 인터랙션을 구현하여 사용자가 행동을 쉽게 파악할 수 있도록 했습니다.
- 마우스 클릭 및 손가락 터치를 고려하여 버튼 등 다양한 인터랙션을 구현하여 사용자 경험을 개선했습니다.
<br/>

### 확장성이 떨어지는 초기 설계의 한계를 옵셔널과 제네릭으로 해결

```tsx
// React.ComponentType<P>는 P 타입의 props를 받는 React 컴포넌트를 의미.
const useOpenModal = <P extends object>(ModalComponent: React.ComponentType<P>) => {
	const {setModalContent, openModal} = ModalStore();

	return (props?: P) => {
		// {...(props || ({} as P))} 는 props가 있으면 그대로 전달하고, 없으면 빈 객체를 전달하는 코드
		setModalContent(<ModalComponent {...(props || ({} as P))} />);
		openModal();
	};
};
```

- 모달 훅은 처음에 props를 받지 않도록 설계되었으나, props를 받는 경우가 생겨서 타입 에러가 발생했습니다.
- 옵셔널 기능을 활용하여 props 유무에 구애받지 않고, 제네릭으로 props 추론이 가능한 안전하고 유연한 훅을 구현했습니다.
- 이로써 향후 프로젝트에서 발생할 수 있는 유연한 요구사항에 대응할 수 있는 컴포넌트의 설계를 할 수 있게 되었습니다.
<br/>

### **배포 테스트 과정에서 반복되는 수동 작업을 대체하기 위한 CI/CD 파이프라인 구축**
<img width="800" alt="6" src="https://github.com/qpwoei0123/magnet/assets/85989215/b9576988-0260-4d96-bb75-99fdab5b9094">

- AWS S3를 기반으로한 배포 자동화를 위해 CI/CD 과정을 학습하고, GitHub Action을 활용하여 파이프라인을 구축했습니다.
- 다양한 오류를 경험하며 GitHub Action 워크플로우를 숙달하고, 이를 통해 작업 효율성을 크게 향상시켰습니다.
<br/>

### **CDN 인증서 문제로 인한 리소스 결핍에 대응하기 위한 자체 CDN 구축**

- CDN 서비스가 다음에도 문제를 일으킬 수 있으므로 S3에 리소스를 보관하고 CloudFront를 사용하여 [CDN을 구축했습니다.](https://www.notion.so/CDN-6760795d07554c9095934fdd11b64865?pvs=21)
- 다음에도 같은 문제가 발생할 경우 자체 CDN의 링크를 사용하도록 하여 웹사이트의 안정성을 확보했습니다.
<br/>

### **UI/UX 개선으로 빠른 피드백을 제공하기 위해 디자인 토큰을 도입**
<img width="600" alt="7" src="https://github.com/qpwoei0123/magnet/assets/85989215/a348ede5-0819-4abe-a433-a52455f26c27">
<img width="600" alt="8" src="https://github.com/qpwoei0123/magnet/assets/85989215/e7d81441-d8e5-41a1-bef6-8817a988f8d5">

- Tailwind CSS 환경에서 사전 정의된 속성을 의미와 용도에 맞게 그룹화하여 효율적으로 토큰화했습니다
- 디자인 관련 코드를 50% 이상 축소하고, 일관된 디자인을 유지하면서 개발 시간을 단축할 수 있었습니다.
<br/>
