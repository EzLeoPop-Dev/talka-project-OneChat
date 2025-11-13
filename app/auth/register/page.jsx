"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Lock, Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [errorUser, setErrorUser] = useState("");
  const [errorPass, setErrorPass] = useState("");
  const [errorConfirm, setErrorConfirm] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    let hasError = false;

    if (!username.trim()) {
      setErrorUser("โปรดกรอกชื่อผู้ใช้");
      hasError = true;
    } else setErrorUser("");

    if (!password.trim()) {
      setErrorPass("โปรดกรอกรหัสผ่าน");
      hasError = true;
    } else setErrorPass("");

    if (!confirm.trim()) {
      setErrorConfirm("โปรดยืนยันรหัสผ่าน");
      hasError = true;
    } else if (confirm !== password) {
      setErrorConfirm("รหัสผ่านไม่ตรงกัน");
      hasError = true;
    } else setErrorConfirm("");

    if (hasError) return;

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.some((u) => u.username === username)) {
      setErrorUser("ชื่อผู้ใช้นี้มีอยู่แล้ว");
      return;
    }

    users.push({ username, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("สมัครสมาชิกสำเร็จ!");
    router.push("/auth/login");
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex w-[1200px] h-[750px] bg-[rgba(152,85,120,0.6)] backdrop-blur-md rounded-3xl shadow-2xl relative overflow-hidden">
       
        <div className="flex flex-col justify-center pl-16 w-1/2 text-white relative z-10 font-inter">
          <h1 className="text-[40px] font-extrabold mb-1 tracking-tight">JOIN US</h1>
          <h2 className="text-[32px] font-light mb-4 text-[#E8E3F2]">At Talka</h2>
          <p className="text-[18px] font-light text-[#B9B3C9] leading-[140%]">
            สมัครง่ายเพียงไม่กี่ขั้นตอน <br />
            เริ่มต้นแชทกับลูกค้าของคุณได้ทันที!
          </p>
        </div>

       
        <div className="absolute w-64 h-64 bg-[linear-gradient(180deg,rgba(127,24,220,1)_20%,rgba(22,3,38,1))] rounded-full opacity-40 top-[-60px] left-[-60px]" />
        <div className="absolute w-80 h-80 bg-[linear-gradient(120deg,rgba(127,24,220,1)_30%,rgba(22,3,38,1)_70%)] rounded-full opacity-40 bottom-[-60px] right-[-60px]" />

    
        <div className="flex justify-center items-center w-1/2 z-20">
          <div className="w-[460px] bg-linear-to-b from-[#ffffff] via-[#f7ebff] to-[#e6d6ff] rounded-3xl shadow-xl p-10 flex flex-col items-center relative">
            <h1 className="text-[28px] font-semibold text-gray-800 mb-1">REGISTER</h1>
            <p className="text-gray-500 mb-6 text-sm">สมัครสมาชิกเพื่อใช้งาน</p>

            <form className="w-full space-y-5 relative" onSubmit={handleRegister}>
         
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                <div className={`flex items-center border rounded-full px-3 py-2.5 ${errorUser ? "border-red-500" : "border-gray-300"} focus-within:ring-1 focus-within:ring-purple-400`}>
                  <User className="text-purple-600 mr-2" size={18} />
                  <input
                    type="text"
                    placeholder="Username"
                    className="w-full outline-none placeholder-gray-400 text-black"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                {errorUser && (
                  <p className="text-red-500 text-xs absolute left-3 bottom-[-18px]">{errorUser}</p>
                )}
              </div>

             
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div className={`flex items-center border rounded-full px-3 py-2.5 ${errorPass ? "border-red-500" : "border-gray-300"} focus-within:ring-1 focus-within:ring-purple-400`}>
                  <Lock className="text-purple-600 mr-2" size={18} />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="w-full outline-none placeholder-gray-400 text-black"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span className="w-px h-5 bg-gray-300 mx-2"></span>
                  <button
                    type="button"
                    className="text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errorPass && (
                  <p className="text-red-500 text-xs absolute left-3 bottom-[-18px]">{errorPass}</p>
                )}
              </div>

             
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                <div className={`flex items-center border rounded-full px-3 py-2.5 ${errorConfirm ? "border-red-500" : "border-gray-300"} focus-within:ring-1 focus-within:ring-purple-400`}>
                  <Lock className="text-purple-600 mr-2" size={18} />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="w-full outline-none placeholder-gray-400 text-black"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                  />
                </div>
                {errorConfirm && (
                  <p className="text-red-500 text-xs absolute left-3 bottom-[-18px]">{errorConfirm}</p>
                )}
              </div>

              
              <button
                type="submit"
                style={{
                  background: "#5d3d99",
                  backgroundImage: "linear-gradient(140deg, rgba(93, 61, 153, 1) 0%, rgba(201, 117, 173, 1) 100%)",
                }}
                className="w-full text-white py-2.5 rounded-full hover:opacity-90 transition shadow-md mt-5"
              >
                สมัครสมาชิก
              </button>

         
              <Link href="/auth/login">
                <button
                  type="button"
                  className="w-full bg-white text-purple-700 py-2.5 rounded-full hover:bg-gray-200  transition shadow-sm"
                >
                  เข้าสู่ระบบ
                </button>
              </Link>

          
              <div className="flex flex-col items-center mt-4">
                <div className="flex items-center w-full mb-4">
                  <div className="grow h-px bg-gray-300" />
                  <span className="px-2 text-gray-500 text-sm">หรือ</span>
                  <div className="grow h-px bg-gray-300" />
                </div>

                <div className="flex justify-center gap-6">
                  <button
                    type="button"
                    onClick={() => alert("Register with Google")}
                    className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md hover:scale-105 transition-transform duration-200"
                  >
                    <img src="/google.png" alt="Google Login" className="w-8 h-8 object-contain" />
                  </button>

                </div>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
