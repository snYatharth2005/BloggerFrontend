import React from "react";
import { github, linkedin, twitter, leetcode, logo, user } from "../../assets/assets";

const ProfileCard = ({ profile }) => {
  if (!profile) return null;

  return (
    <div className="w-72 bg-[#F0EFEF] border border-gray-300 rounded-md shadow-sm p-6 font-poppins transition transform hover:shadow-md hover:scale-[1.01]">

      <div className="flex flex-col items-center text-center">
        <img
          src={profile.profileImageUrl || user}
          alt="Author"
          className="w-24 h-24 rounded-full border-4 border-white shadow mb-3 object-cover"
        />

        <h2 className="text-lg font-semibold text-gray-900">
          {profile.fullName || profile.username}
        </h2>

        <p className="text-sm text-gray-600 mt-1">
          {profile.about || "This user has not added a bio yet."}
        </p>
      </div>

      <div className="flex justify-center space-x-4 mt-4">

        {profile.twitter && (
          <a href={profile.twitter} target="_blank" rel="noreferrer">
            <img src={twitter} alt="twitter" className="w-6 h-6 hover:scale-110 transition" />
          </a>
        )}

        {profile.twitter && (
          <a href={profile.leetcode} target="_blank" rel="noreferrer">
            <img src={leetcode} alt="leetcode" className="w-6 h-6 hover:scale-110 transition" />
          </a>
        )}

        {profile.github && (
          <a href={profile.github} target="_blank" rel="noreferrer">
            <img src={github} alt="github" className="w-6 h-6 hover:scale-110 transition" />
          </a>
        )}

        {profile.linkedin && (
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            <img src={linkedin} alt="linkedin" className="h-6 w-6 hover:scale-110 transition" />
          </a>
        )}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2 text-center text-sm">
        <div className="bg-white border border-gray-300 rounded-md p-2">
          <span className="block font-bold text-gray-900">{profile.postsCount || 0}</span>
          <span className="text-gray-600">Posts</span>
        </div>
        <div className="bg-white border border-gray-300 rounded-md p-2">
          <span className="block font-bold text-gray-900">{profile.followers || 0}</span>
          <span className="text-gray-600">Followers</span>
        </div>
      </div>

      <div className="mt-5 flex justify-center">
        <button className="px-5 py-2 bg-black text-white rounded-md font-medium hover:bg-gray-800 transition">
          Follow
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
