import React from "react";

interface StreakNotifyProps {
  title: string;
  message: string;
}

const StreakNotify: React.FC<StreakNotifyProps> = ({ title, message }) => {
  return (
    <li className="cursor-pointer rounded-xl group">
      <div
        className="bg-[#CC7900] group-hover:bg-[#dd8508] transition-colors ease-in-out flex justify-between rounded-xl"
        style={{ padding: "10px" }}
      >
        <div
          className="h-fit p-4 rounded-2xl relative text-white"
          style={{ padding: "10px" }}
        >
          <h2
            className="flex gap-1 text-[22px] text-white w-fit"
            style={{ marginBottom: "5px" }}
          >
            {title.length !== 0 ? title : "Hình như bạn quên gì đó"}
          </h2>
          <span className="font-semibold">
            {" "}
            {message.length !== 0
              ? message
              : "Hãy tiếp tục kéo dài streak nào."}
          </span>
        </div>
        <img
          src="https://d35aaqx5ub95lt.cloudfront.net/images/icons/398e4298a3b39ce566050e5c041949ef.svg"
          alt=""
          className="w-[50px] group-hover:animate-pulse-bounce"
          style={{ marginRight: "10px" }}
        />
      </div>
    </li>
  );
};

export default StreakNotify;
