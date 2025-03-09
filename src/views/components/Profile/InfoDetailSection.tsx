import { IUserActivity } from "../../../interfaces/Auth/IUserProfile";
import { format } from "date-fns";

interface InfoDetailSectionProps {
  firstName: string;
  lastName: string;
  nickName: string;
  userActivity: IUserActivity;
}

const InfoDetailSection: React.FC<InfoDetailSectionProps> = ({
  firstName,
  lastName,
  nickName,
  userActivity,
}) => {
  const formattedDate = userActivity?.date
    ? format(new Date(userActivity.date), "'Tháng' MM 'Năm' yyyy")
    : "";
  return (
    <div className="h-[134px] border-b-2 border-[#37464F] relative">
      <img
        src="https://d35aaqx5ub95lt.cloudfront.net/images/borderlessFlags/b9817d83179e278c91771d903953bfc6.svg"
        alt=""
        className="w-[31px] h-[24px] absolute right-0 bottom-[26px]"
      />
      {/* Name */}
      <div className="text-[28px] font-bold">{firstName + " " + lastName}</div>
      {/* Nick name */}
      <div className="text-[#52656D] font-semibold text-[17px] transform translate-y-[-4px]">
        {nickName}
      </div>
      {/* Date Join */}
      <div className="text-white text-[17px]  transform translate-y-[-4px]">
        Đã tham gia {formattedDate}
      </div>
    </div>
  );
};

export default InfoDetailSection;
