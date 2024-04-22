import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Quill의 스노우 테마를 import합니다.

interface MyQuillComponentProps {
	value: string;
	setValue: (value: string) => void;
}

export const MyQuillComponent = ({value, setValue}: MyQuillComponentProps) => {
	return (
		<ReactQuill
			theme="snow"
			value={value}
			onChange={setValue}
			style={{height: '200px', margin: '0 0 30px 0'}}
			placeholder="멘토링 내용을 입력해주세요."
		/>
	);
};

export default MyQuillComponent;
