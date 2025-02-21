import facebook_icon from "../../../../assets/imgs/login/facebook_icon.png";
import { InputField } from "../../../components/Auth/Input";
import { Navbar } from "../../../components/Auth/NavBar";
const RegisterPage: React.FC = () => {
  return (
    <div className="w-full h-[100vh] pt-[31px] bg-[#131f24] flex flex-col items-center justify-center">
      {/* Navigate bar */}
      <Navbar pageName="register"></Navbar>

      {/* Main content */}
      <div className="flex flex-col w-[376px] gap-[20px]">
        <div
          className="text-white font-bold text-[25px] text-center"
          style={{ marginBottom: "10px" }}
        >
          Tạo hồ sơ
        </div>
        <InputField type="text" placeholder="Tuổi" inputMode="numeric" />
        <InputField type="text" placeholder="Tên (tuỳ chọn)" />
        <InputField type="email" placeholder="Email" />
        <InputField type="text" placeholder="Mật khẩu" />
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
          TẠO TÀI KHOẢN
        </button>

        <div className="text-[#52656B] flex items-center w-full gap-2">
          <hr className="flex-grow border-t border-[#52656B]" />
          <div className="text-sm font-bold">HOẶC</div>
          <hr className="flex-grow border-t border-[#52656B]" />
        </div>
        <div className="flex w-full gap-4">
          <button
            className="w-full text-[#3C5A99] font-semibold flex justify-center gap-1 border-2 border-[#37464F] border-b-0 rounded-2xl hover:bg-[#2b131f42] cursor-pointer 
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
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
