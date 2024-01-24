import React, { useEffect, useState } from 'react';
import { MyQuillComponent } from '../component/MyQuillComponent';

export const CreateMentoringPage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [cost, setCost] = useState('');
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(
      title.length > 0 &&
        description.length > 0 &&
        cost.length > 0 &&
        time.length > 0 &&
        date.length > 0,
    );
  }, [title, description, cost, time, date]);

  const handleSubmit = () => {
    console.log(title, description, cost, time, date);
  };

  return (
    <div className="flexCenter">
      <section className="flexCol gap-5 py-10">
        <div className="flexCenter">
          <p className="text-3xl font-semibold">멘토링 정보 입력</p>
        </div>
        <div className="inputStyle">
          <p>제목</p>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="제목을 입력해 주세요."
          />
        </div>

        <div className="inputStyle">
          <p>소개내용</p>
          <MyQuillComponent value={description} setValue={setDescription} />
        </div>
        <div className="inputStyle">
          <p>비용(원)</p>
          <input
            type="number"
            value={cost}
            onChange={e => setCost(e.target.value)}
            placeholder="비용"
            className="input"
            step={1000}
          />
        </div>
        <div className="inputStyle">
          <p>날짜</p>
          <input type="date" value={date} onChange={e => setDate(e.target.value)} />
        </div>
        <div className="inputStyle">
          <p>시간</p>
          <input type="time" value={time} onChange={e => setTime(e.target.value)} />
        </div>
        <button
          className={`buttonStyle py-2 ${
            isFormValid ? 'hover:opacity-80' : 'opacity-20'
          } bg-black text-white`}
          onClick={handleSubmit}
          disabled={!isFormValid}
        >
          개설하기
        </button>
      </section>
    </div>
  );
};

export default CreateMentoringPage;
