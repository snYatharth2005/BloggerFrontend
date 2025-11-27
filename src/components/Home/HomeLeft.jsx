import { useEffect, useState } from "react";
import ProfileCard from "./ProfileCard";
import axiosClient from "../../api/axiosClient";

const HomeLeft = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    axiosClient.get("/profile/me").then((res) => setProfile(res.data));
  }, []);
  return (
    <div className="block my-10 mx-auto">
      <div className="border border-gray-200 h-155 overflow-y-auto no-scrollbar rounded-t-md rounded-b-lg">
        <ProfileCard profile={profile}/>
      </div>
    </div>
  );
};

export default HomeLeft;
