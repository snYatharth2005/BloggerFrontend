import Posts from "../post/Posts";

const HomeCenter = () => {
  return (
    <div className="center mt-20 mx-2">
      <div className="border border-gray-200 h-180 overflow-y-auto no-scrollbar rounded-t-md rounded-b-lg">
        <Posts />
      </div>
    </div>
  );
};

export default HomeCenter;
