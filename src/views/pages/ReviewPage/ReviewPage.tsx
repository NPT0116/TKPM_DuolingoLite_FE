import { useEffect, useState } from "react";
import { fetchUserId } from "../../../services/Authentication/AuthService";
import { IReviewRecordDue } from "../../../interfaces/SpaceRepetation/IDueReview";
import { fetchDueReview } from "../../../services/SpaceRepetition/GetDueReviewService";
import { useNavigate } from "react-router-dom";

const ReviewPage: React.FC = () => {
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    fetchUserId(setUserId);
  }, []);

  const [dueReviewRecord, setDueReviewRecord] =
    useState<IReviewRecordDue | null>(null);

  useEffect(() => {
    if (userId) {
      fetchDueReview(userId, setDueReviewRecord);
    }
  }, [userId]);

  return (
    <div className="w-3/5 min-w-[445px] flex justify-center text-center">
      {dueReviewRecord?.dueReviews.length !== 0 ? (
        <div className="w-[80%] flex flex-col justify-start md:justify-center items-center gap-5">
          <img
            src="	https://d35aaqx5ub95lt.cloudfront.net/images/practiceHub/561ed67871590505129f03902028090b.svg"
            alt=""
            className="w-[100px]"
          />
          <span className="text-[25px]  font-bold ">
            Hãy cùng luyện tập lại các bài cũ nào.
          </span>
          <button
            className="bg-[#3B4CFC] rounded-2xl cursor-pointer hover:bg-[#4255FF] text-[#131F24] active:translate-y-1 w-[70%]"
            style={{ padding: "10px 0", boxShadow: "0 4px 0 0 #3F22EB" }}
            onMouseDown={(e) => {
              e.currentTarget.style.boxShadow = "0 0 0 0 #3F22EB";
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.boxShadow = "0 4px 0 0 #3F22EB";
            }}
            onClick={() => {
              navigate("/review-lesson");
            }}
          >
            <span className="font-bold">BẮT ĐẦU</span>
          </button>
        </div>
      ) : (
        <div className="w-[80%] flex flex-col justify-center items-center gap-5">
          <img
            src="https://design.duolingo.com/4690270d396c7ee17c14.svg"
            alt=""
            className="w-[200px]"
          />
          <span className="text-[25px] text-[#4a5d68] font-bold">
            Tuyệt vời quá! Bạn hiện tại không có bài học nào.
          </span>
        </div>
      )}
    </div>
  );
};

export default ReviewPage;
