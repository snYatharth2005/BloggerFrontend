import React, {useState, useEffect} from 'react'
import HomeCenter from './HomeCenter';
import ProfileCard from './ProfileCard';
import HomeRight from './HomeRight';
import axiosClient from "../../api/axiosClient";


const Home = () => {

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    axiosClient.get("/profile/me").then((res) => setProfile(res.data));
  }, []);


  return (
    <div className="flex justify-between items-baseline w-full max-w-7xl mx-auto">
        <div className="flex-2 hidden lg:block ">
          <ProfileCard profile = {profile} />
        </div>
        <div className="middle flex-5 p-5 mt-12 lg:block">
          <HomeCenter />
        </div>
        <div className="flex-2 hidden lg:block md:block">
          <HomeRight />
        </div>
    </div>
  )
}

export default Home;