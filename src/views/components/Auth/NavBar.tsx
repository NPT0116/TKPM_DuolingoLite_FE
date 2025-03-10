import { Link } from "react-router-dom";
import { PATH } from "../../../configs/path";

interface NavbarProps {
  pageName: "register" | "login";
}

export const Navbar: React.FC<NavbarProps> = ({ pageName }) => {
  const linkTo =
    pageName === "register" ? PATH.LOGIN.index : PATH.REGISTER.index;
  const linkText = pageName === "register" ? "ĐĂNG NHẬP" : "ĐĂNG KÝ";

  return (
    <div
      className="w-full flex flex-row justify-end absolute top-[31px]"
      style={{ padding: "0 28px" }}
    >
      {/* Close Button */}
      {/* <div>
        <img
          src="https://d35aaqx5ub95lt.cloudfront.net/images/48b38c250a652878bc0c779a07f2ca48.svg"
          alt="Close"
        />
      </div> */}
      {/* Navigate Button */}
      <Link to={linkTo} className="text-[14px]">
        <button
          className="font-bold border-2 border-b-4 border-[#37464F] text-[#49C0F8] 
          hover:text-[#49c1f8c5] rounded-2xl hover:bg-[#2b131f42] cursor-pointer 
          transition-all duration-100 active:border-b-2 active:translate-y-0.5"
          style={{ padding: "10px 16px 16px 16px" }}
        >
          {linkText}
        </button>
      </Link>
    </div>
  );
};
