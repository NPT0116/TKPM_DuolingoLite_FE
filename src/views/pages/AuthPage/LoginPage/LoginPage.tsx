import { InputField } from "../../../components/Auth/Input";
import { Navbar } from "../../../components/Auth/NavBar";
import facebook_icon from "../../../../assets/imgs/login/facebook_icon.png";
import google_icon from "../../../../assets/imgs/login/google_icon.png";

const LoginPage: React.FC = () => {
  return (
    <div
      className="w-full h-[100vh] pt-[31px] bg-[#131f24] flex flex-col items-center justify-center"
      style={{}}
    >
      {/* Navigate bar */}
      <Navbar pageName="login"></Navbar>

      {/* Main content */}
      <div className="flex flex-col w-[376px] gap-[20px]">
        <div
          className="text-white font-bold text-[25px] text-center"
          style={{ marginBottom: "10px" }}
        >
          Đăng nhập
        </div>
        <InputField type="text" placeholder="Email hoặc tên đăng nhập" />
        <div className="relative">
          <InputField type="password" placeholder="Mật khẩu" />
          <div className="absolute right-4 top-4 text-[#4D6068] hover:text-white font-bold cursor-pointer">
            QUÊN?
          </div>
        </div>
        <button
          className="bg-[#49C0F8] hover:bg-[#97deff] text-[#19323D] font-bold rounded-xl cursor-pointer active:translate-y-1 transition-all duration-100"
          style={{
            padding: "10px 0px",
            boxShadow: "0 4px 0 0 #1899D6",
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.boxShadow = "none";
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.boxShadow = "0 4px 0 0 #1899D6";
          }}
        >
          ĐĂNG NHẬP
        </button>

        <div className="text-[#52656B] flex items-center w-full gap-2">
          <hr className="flex-grow border-t border-[#52656B]" />
          <div className="text-sm font-bold">HOẶC</div>
          <hr className="flex-grow border-t border-[#52656B]" />
        </div>
        <div className="flex w-full gap-4">
          <button
            className="w-[50%] text-[#3C5A99] font-semibold flex justify-center gap-1 border-2 border-[#37464F] border-b-0 rounded-2xl hover:bg-[#2b131f42] cursor-pointer 
          transition-all duration-100 active:translate-y-0.5"
            style={{ padding: "10px", boxShadow: "0 4px 0 0 #37464F" }}
            onMouseDown={(e) => {
              e.currentTarget.style.boxShadow = "0 2px 0 0 #37464F";
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.boxShadow = "0 4px 0 0 #37464F";
            }}
          >
            <img src={facebook_icon} alt="" className="w-[25px] h-[25px]" />
            <div>FACEBOOK</div>
          </button>
          <button
            className="w-[50%] text-[#3C5A99] font-semibold flex justify-center gap-1 border-2 border-[#37464F] border-b-0 rounded-2xl hover:bg-[#2b131f42] cursor-pointer 
          transition-all duration-100 active:translate-y-0.5"
            style={{ padding: "10px", boxShadow: "0 4px 0 0 #37464F" }}
            onMouseDown={(e) => {
              e.currentTarget.style.boxShadow = "0 2px 0 0 #37464F";
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.boxShadow = "0 4px 0 0 #37464F";
            }}
          >
            <img src={google_icon} alt="" className="w-[25px] h-[25px]" />
            <div>GOOGLE</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
