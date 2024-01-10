const Schedulebox = () => {
  return (
    <div className="buttonStyle flexCenter snap-center flex-col min-w-64  h-64 rounded-md">
      <div className="w-full h-2/3 relative">
        <img
          className=" w-full h-full object-cover rounded-tr-md flex-1 "
          src="https://cdn.imweb.me/thumbnail/20220615/7534a07667bce.jpg"
        />
      </div>

      <div className="w-full flex-1 flexCenter">
        <p className="font-semibold">2024.01.18 (목), 21:00~22:00</p>
      </div>
    </div>
  );
};

export default Schedulebox;
