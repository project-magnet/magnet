import React from 'react';
import MentorCard from '../component/MentorCard';

const HomePage = () => {
  return (
    <section>
      <section className="w-full py-6 sm:py-12 md:py-24 lg:py-32 xl:py-48 ">
        <div className="container mx-5 md:mx-20">
          <div className="flex flex-col justify-center space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
              Connect with Magnet
            </h1>
            <p className=" text-gray-500 text-xs md:text-xl">
              당신의 커리어 여정을 안내해 줄 완벽한 멘토를 찾아보세요.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
        <div className="flex flex-col items-center justify-center space-y-4 ">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Meet our Top Mentors</h2>
          <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            멘티의 성공을 위해 노력하는 경험 많은 멘토를 만나보세요.
          </p>
        </div>
        <div className="w-full  grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
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
    </section>
  );
};

export default HomePage;
