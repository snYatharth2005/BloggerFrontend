import React from "react";
import Posts from "../post/Posts";

const HomeCenter = () => {
  return (
    <div className="center my-10 mx-2">
      <div className="border border-gray-200 h-155 overflow-y-auto no-scrollbar rounded-t-md rounded-b-lg">
        <Posts />
      </div>
    </div>
  );
};

export default HomeCenter;
