import { InputField } from "../../../components/Auth/Input";
import { Navbar } from "../../../components/Auth/NavBar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../../configs/axiosConfig";
import facebook_icon from "../../../../assets/imgs/login/facebook_icon.png";
import google_icon from "../../../../assets/imgs/login/google_icon.png";
import { getUserRanking } from "../../../../services/LeaderBoard/GetUserRanking";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const navigation = useNavigate();

  const earlyCheck = () => {
    let count = 0;
    // Early check
    if (!email) {
      setErrors((prev) => ({ ...prev, email: "Email is required" }));
      count++;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      setErrors((prev) => ({ ...prev, email: "Invalid email address" }));
      count++;
    }
    if (!password) {
      setErrors((prev) => ({ ...prev, password: "Password is required" }));
      count++;
    }
    return count > 0 ? false : true;
  };
  const handleFetchUserRanking = () => {
    console.log("At First Store current User Ranking");
    const fetchUserRanking = async () => {
      const { data } = await getUserRanking();
      if (data) {
        localStorage.setItem("previousUserRanking", JSON.stringify(data.rank));
      }
    };
    fetchUserRanking();
  };
  const handleLogin = async () => {
    const payload = {
      email: email,
      password: password,
    };
    if (!earlyCheck()) {
      console.log(errors);
    } else {
      try {
        const response = await api.post("/Authentication/login", payload, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log("Login Successfully:", response);
        localStorage.setItem("authToken", response.data.value);
        handleFetchUserRanking();
        navigation("/home");
      } catch (error: any) {
        if (error.response) {
          console.error("Error status:", error.response.status);
          console.error("Error details:", error.response.data);
          if (error.response.data.title.toLowerCase().includes("password")) {
            setErrors({ password: error.response.data.detail });
          } else if (
            error.response.data.title.toLowerCase().includes("email")
          ) {
            setErrors({ email: error.response.data.detail });
          }
        } else if (error.request) {
          console.error("No response received:", error.request);
        } else {
          console.error("Error:", error.message);
        }
      }
    }
  };

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
        <InputField
          error={errors.email}
          type="text"
          placeholder="Email"
          width={100}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="relative">
          <InputField
            error={errors.password}
            type="password"
            placeholder="Mật khẩu"
            width={100}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* <div className="absolute right-4 top-4 text-[#4D6068] hover:text-white font-bold cursor-pointer">
            QUÊN?
          </div> */}
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
          onClick={handleLogin}
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
