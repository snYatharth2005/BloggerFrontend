import React, {useState, useEffect} from 'react'
import HomeCenter from './HomeCenter';
import ProfileCard from './ProfileCard';
import HomeRight from './HomeRight';
import axiosClient from "../../api/axiosClient";
import HomeLeft from './HomeLeft';


const Home = () => {
  return (
    <div className="flex justify-between items-start w-full max-w-7xl mx-auto my-auto">
        <div className="flex-2 hidden lg:block p-2 my-25">
          <HomeLeft />
        </div>
        <div className="middle flex-5 p-5 lg:block">
          <HomeCenter />
        </div>
        <div className="flex-2 hidden lg:block md:block">
          <HomeRight />
        </div>
    </div>
  )
}

export default Home;