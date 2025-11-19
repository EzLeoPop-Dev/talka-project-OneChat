"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Lock, Eye, EyeOff, X } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorUser, setErrorUser] = useState(false);
  const [errorPass, setErrorPass] = useState(false);
  const [popup, setPopup] = useState({
    show: false,
    message: "",
    success: false,
    fadeOut: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    let hasError = false;
    if (!username.trim()) {
      setErrorUser(true);
      hasError = true;
    } else setErrorUser(false);

    if (!password.trim()) {
      setErrorPass(true);
      hasError = true;
    } else setErrorPass(false);

    if (hasError) return;

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    const isSuccess = !!user;

    setPopup({
      show: true,
      message: isSuccess
        ? "เข้าสู่ระบบสำเร็จ!"
        : "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง",
      success: isSuccess,
      fadeOut: false,
    });

    setTimeout(() => setPopup((p) => ({ ...p, fadeOut: true })), 2500);
    setTimeout(() => {
      setPopup({ show: false, message: "", success: false, fadeOut: false });
      if (isSuccess) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        router.push("/dashboard");
      }
    }, 3000);
  };

  const closePopup = () => {
    setPopup({ show: false, message: "", success: false, fadeOut: false });
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex w-[1200px] h-[750px] bg-[rgba(152,85,120,0.6)] backdrop-blur-md rounded-3xl shadow-2xl relative overflow-hidden">
      
        <div className="flex flex-col justify-center pl-16 w-1/2 text-white relative z-10 font-inter">
          <h1 className="text-[40px] font-extrabold mb-1 tracking-tight">
            WELCOME
          </h1>
          <h2 className="text-[32px] font-light mb-4 text-[#E8E3F2]">
            To Talka
          </h2>
          <p className="text-[18px] font-light text-[#B9B3C9] leading-[140%]">
            รวมทุกการแชทไว้ในที่เดียว
            <br />
            สะดวก รวดเร็ว ไม่ต้องสลับแอป
            <br />
            เชื่อมต่อทุกแพลตฟอร์ม แชทได้ต่อเนื่องไม่มีสะดุด
          </p>
        </div>

        
        <div className="absolute w-64 h-64 bg-[linear-gradient(180deg,rgba(127,24,220,1)_20%,rgba(22,3,38,1))] rounded-full opacity-40 top-[-60px] left-[-60px]" />
        <div className="absolute w-80 h-80 bg-[linear-gradient(120deg,rgba(127,24,220,1)_30%,rgba(22,3,38,1)_70%)] rounded-full opacity-40 bottom-[-60px] right-[-60px]" />

        
        <div className="flex justify-center items-center w-1/2 ">
          <div className="w-[460px] bg-gradient-to-b from-[#ffffff] via-[#f7ebff] to-[#e6d6ff] rounded-3xl shadow-xl p-10 flex flex-col items-center relative">
            <h1 className="text-[28px] font-semibold text-gray-800 mb-1">
              LOGIN
            </h1>
            <p className="text-gray-500 mb-8 text-sm">เข้าสู่ระบบเพื่อใช้งาน</p>

            <form className="w-full space-y-6" onSubmit={handleSubmit}>
            
              <div className="relative">
                <div
                  className={`flex items-center border rounded-full px-3 py-2.5 ${
                    errorUser ? "border-red-500" : "border-gray-300"
                  } focus-within:ring-1 focus-within:ring-purple-400`}
                >
                  <User className="text-purple-600 mr-2" size={18} />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username or Email"
                    className="w-full outline-none text-black placeholder-gray-400"
                  />
                </div>
                {errorUser && (
                  <p className="absolute text-red-500 text-xs left-3 top-full mt-1">
                    โปรดกรอกชื่อผู้ใช้
                  </p>
                )}
              </div>

              <div className="relative">
                <div
                  className={`flex items-center border rounded-full px-3 py-2.5 ${
                    errorPass ? "border-red-500" : "border-gray-300"
                  } focus-within:ring-1 focus-within:ring-purple-400`}
                >
                  <Lock className="text-purple-600 mr-2" size={18} />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full outline-none text-black placeholder-gray-400"
                  />
                  <span className="w-[1px] h-5 bg-gray-300 mx-2"></span>
                  <button
                    type="button"
                    className="text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errorPass && (
                  <p className="absolute text-red-500 text-xs left-3 top-full mt-1">
                    โปรดกรอกรหัสผ่าน
                  </p>
                )}
              </div>

              <div className="pt-2 space-y-3">
                <button
                  type="submit"
                  style={{
                    background: "#5d3d99",
                    backgroundImage:
                      "linear-gradient(140deg, rgba(93, 61, 153, 1) 0%, rgba(201, 117, 173, 1) 100%)",
                  }}
                  className="w-full text-white py-2.5 rounded-full hover:opacity-90 transition shadow-md"
                >
                  เข้าสู่ระบบ
                </button>

                <Link href="/auth/register">
                  <button className="w-full bg-white text-purple-700 py-2.5 rounded-full hover:bg-gray-200 transition shadow-sm">
                    สมัครสมาชิก
                  </button>
                </Link>
              </div>

        
              <div className="flex flex-col items-center mt-4">
                <div className="flex items-center w-full mb-4">
                  <div className="flex-grow h-[1px] bg-gray-300" />
                  <span className="px-2 text-gray-500 text-sm">หรือ</span>
                  <div className="flex-grow h-[1px] bg-gray-300" />
                </div>

                <div className="flex justify-center gap-6">
                  <button
                    type="button"
                    onClick={() => alert("Login with Google")}
                    className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md hover:scale-105 transition-transform duration-200"
                  >
                    <img
                      src="/google.png"
                      className="w-8 h-8 object-contain"
                    />
                  </button>

                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {popup.show && (
        <div
          className={`fixed inset-0 bg-black/40 flex justify-center items-center z-50 transition-opacity duration-300 ${
            popup.fadeOut ? "opacity-0" : "opacity-100"
          }`}
        >
          <div
            className={`relative w-[600px] h-[400px] bg-white shadow-2xl rounded-4xl p-8 text-center flex flex-col justify-center items-center gap-10 transform transition-all duration-300 ${
              popup.fadeOut
                ? "scale-95 opacity-0 translate-y-4"
                : "scale-100 opacity-100 translate-y-0"
            }`}
          >
           
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
              onClick={closePopup}
            >
              <X size={24} />
            </button>

            <img
              src={popup.success ? "/correct-icon.png" : "/wrong-icon.png"}
              alt={popup.success ? "success" : "error"}
              className="w-20 h-20 object-contain"
            />
            <h2
              className={`text-xl font-semibold ${
                popup.success ? "text-green-600" : "text-red-600"
              }`}
            >
              {popup.message}
            </h2>
          </div>
        </div>
      )}
    </div>
  );
}
