import facebook_icon from "../../../../assets/imgs/login/facebook_icon.png";
import { InputField } from "../../../components/Auth/Input";
import { Navbar } from "../../../components/Auth/NavBar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../../configs/axiosConfig";

const RegisterPage: React.FC = () => {
  api.get("/Course");
  const navigate = useNavigate();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const earlyCheck = () => {
    let count = 0;
    if (!firstName) {
      setErrors((prev) => ({ ...prev, firstName: "First name is required" }));
      count++;
    }
    if (!lastName) {
      setErrors((prev) => ({ ...prev, lastName: "Last name is required" }));
      count++;
    }
    if (!email) {
      setErrors((prev) => ({ ...prev, email: "Email is required" }));
      count++;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      setErrors((prev) => ({ ...prev, email: "Invalid email address" }));
      count++;
    }
    if (!username) {
      setErrors((prev) => ({ ...prev, username: "User name is required" }));
      count++;
    }
    if (!password) {
      setErrors((prev) => ({ ...prev, password: "Password is required" }));
      count++;
    }
    if (!rePassword) {
      setErrors((prev) => ({ ...prev, password: "Re-Enter password" }));
      count++;
    }
    if (count === 0) {
      if (password !== rePassword) {
        setErrors((prev) => ({ ...prev, password: "Password not the same" }));
        setErrors((prev) => ({ ...prev, repassword: "Password not the same" }));
        count++;
      }
    }
    return count > 0 ? false : true;
  };

  const handleRegister = async () => {
    if (earlyCheck()) {
      const formData = new FormData();
      formData.append("UserRegisterDto.FirstName", firstName);
      formData.append("UserRegisterDto.LastName", lastName);
      formData.append("UserRegisterDto.Email", email);
      formData.append("UserRegisterDto.UserName", username);
      formData.append("UserRegisterDto.Password", password);

      try {
        const { data } = await api.post("/Authentication/register", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("Registration successful:", data);
        navigate("/login");
      } catch (error: any) {
        console.error("Error registering:", error);
        console.error("Error detail:", error.response.data);
        if (error.response.data.code.toLowerCase().includes("firstname")) {
          setErrors((prev) => ({
            ...prev,
            firstName: error.response.data.description,
          }));
        }
        if (error.response.data.code.toLowerCase().includes("lastname")) {
          setErrors((prev) => ({
            ...prev,
            lastName: error.response.data.description,
          }));
        }
        if (error.response.data.code.toLowerCase().includes("email")) {
          setErrors((prev) => ({
            ...prev,
            email: error.response.data.description,
          }));
        }
        if (error.response.data.code.toLowerCase().includes("username")) {
          setErrors((prev) => ({
            ...prev,
            username: error.response.data.description,
          }));
        }
        if (error.response.data.code.toLowerCase().includes("password")) {
          setErrors((prev) => ({
            ...prev,
            password: error.response.data.description,
          }));
        }
      }
    }
  };

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

        <div className="w-full flex flex-row gap-4 ">
          <InputField
            error={errors.firstName}
            width={100}
            type="text"
            placeholder="Tên"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
              setErrors((prev) => ({ ...prev, firstName: "" }));
            }}
          />
          <InputField
            error={errors.lastName}
            width={100}
            type="text"
            placeholder="Họ"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
              setErrors((prev) => ({ ...prev, lastName: "" }));
            }}
          />
        </div>

        <InputField
          error={errors.email}
          width={100}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setErrors((prev) => ({ ...prev, email: "" }));
          }}
        />
        <InputField
          error={errors.username}
          width={100}
          type="text"
          placeholder="Tên người dùng"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setErrors((prev) => ({ ...prev, username: "" }));
          }}
        />
        <InputField
          error={errors.password}
          width={100}
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setErrors((prev) => ({ ...prev, password: "" }));
          }}
        />
        <InputField
          error={errors.repassword}
          width={100}
          type="password"
          placeholder="Nhập lại mật khẩu"
          value={rePassword}
          onChange={(e) => {
            setRePassword(e.target.value);
            setErrors((prev) => ({ ...prev, repassword: "" }));
          }}
        />
        <button
          className="bg-[#49C0F8] hover:bg-[#97deff] text-[#19323D] font-bold rounded-xl cursor-pointer active:translate-y-1 transition-all duration-100"
          style={{
            padding: "10px 0px",
            boxShadow: "0 4px 0 0 #1899D6",
          }}
          onClick={handleRegister}
          onMouseDown={(e) => {
            e.currentTarget.style.boxShadow = "none";
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.boxShadow = "0 4px 0 0 #1899D6";
          }}
        >
          TẠO TÀI KHOẢN
        </button>

        {/* <div className="text-[#52656B] flex items-center w-full gap-2">
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
        </div> */}
      </div>
    </div>
  );
};

export default RegisterPage;
