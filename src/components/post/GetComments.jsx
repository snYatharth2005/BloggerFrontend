import { useEffect, useState } from "react";
import { getComments } from "../../api/axiosClient";
import { userIcon } from "../../assets/assets";
import { formatDateTime } from "./Posts";

function GetComments({id, refreshTrigger }){
  const [postComments, setPostComments] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    getComments(id)
      .then((data) => setPostComments(data || []))
      .catch((err) =>
        console.error("error while fetching comments for post", err)
      )
      .finally(() => setLoading(false));
  }, [id, refreshTrigger ]);

  if(loading)
    return <h2 className="text-center text-gray-500 mt-20">Loading...</h2>;

  return (
    <div className="max-h-80 overflow-y-auto space-y-3 pr-1">
      {postComments.map((comm) => (
        <div
          key={comm.id}
          className="max-w-3xl mx-auto my-2 bg-[#F0EFEF] border border-gray-300 rounded-md shadow-sm p-3 font-poppins"
        >
          <div className="flex items-start gap-3">
            <img
              src={comm.user.profileImageUrl || userIcon}
              alt={comm.user.username}
              className="w-12 h-12 rounded-full border border-gray-300 object-cover"
            />

            <div className="flex flex-col flex-1">
              <div className="flex items-center justify-between mb-1">
                <h1 className="text-sm font-semibold text-gray-900">
                  {comm.user.username}
                </h1>

                <span className="text-xs text-gray-500">
                  {formatDateTime(comm.createdAt)}
                </span>
              </div>

              <p className="text-gray-700 text-sm leading-relaxed">
                {comm.content}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default GetComments;
