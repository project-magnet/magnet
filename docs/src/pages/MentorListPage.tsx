import MentorCard from '../component/MentorCard';
import 'remixicon/fonts/remixicon.css';

const MentorListPage = () => {
  const categories = [
    { title: '전체', image: <i className="ri-menu-line ri-2x"></i> },
    { title: '개발', image: <i className="ri-window-line ri-2x"></i> },
    { title: '게임 개발', image: <i className="ri-gamepad-line ri-2x"></i> },
    { title: '데이터 과학', image: <i className="ri-line-chart-line  ri-2x"></i> },
    { title: '보안·네트워크', image: <i className="ri-folder-shield-2-line ri-2x"></i> },
    { title: '하드웨어', image: <i className="ri-hard-drive-3-line ri-2x"></i> },
  ];

  return (
    <section className="flexCol w-full bg-slate-100 p-3 sm:p-10 gap-10">
      <div className="flexCenter flex-wrap gap-10">
        {categories.map((el, index) => (
          <div
            key={index}
            className="bg-white flexCenter flex-col w-24 h-24  rounded-md shadow-md cursor-pointer"
          >
            {el.image}
            <p className="font-semibold text-sm">{el.title}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        <MentorCard />
        <MentorCard />
        <MentorCard />
        <MentorCard />
        <MentorCard />
        <MentorCard />
        <MentorCard />
        <MentorCard />
        <MentorCard />
        <MentorCard />
        <MentorCard />
        <MentorCard />
        <MentorCard />
        <MentorCard />
      </div>
    </section>
  );
};
export default MentorListPage;
