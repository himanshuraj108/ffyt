"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import banner from "@/public/banner.jpg";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";

const HomePage = () => {
  const [loading, setloader] = useState(false);
  const [formdata, setformdata] = useState({ uid: "" });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloader(true);
    try {
      await axios.post("/api/users", formdata);
      if(formdata.uid.length > 16){
        setformdata("");
      }
      localStorage.setItem("currentUserUid", formdata.uid);
      toast.success("Added successfully");
      router.push("https://ritikyadavlive.vercel.app/status");
    } catch (error) {
      toast.error("UID already exists or Invalid");
    } finally {
      setloader(false);
    }
  };

  const handleChange = (e) =>
    setformdata((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-b from-white to-gray-100">
      <div className="flex flex-col w-full max-w-md mx-auto px-4">
        <div className="relative w-full">
          <Image
            src={banner}
            alt="banner"
            className="w-full h-auto rounded-lg shadow-lg mt-4"
            priority
          />
          <div className="mt-6 text-center">
            <Link
              href="/status"
              className="inline-block bg-red-600 text-white px-6 py-3 rounded-full text-lg font-bold shadow-md hover:bg-red-700 transform hover:scale-105 transition-all duration-300 animate-pulse"
            >
              CHECK YOUR UID STATUS
            </Link>
          </div>
        </div>

        {/* Moving Message */}
        <div className="relative my-6 overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/50 to-purple-600/50 blur-sm"></div>
          <div className="relative px-4 py-3 overflow-hidden">
            <div className="animate-marquee">
              <span className="inline-block text-xl font-bold text-white">
                ⭐ Give UID for shorts video ⭐
              </span>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center gap-6 mt-8 bg-amber-300 p-6 rounded-2xl shadow-lg transform hover:shadow-xl transition-all duration-300 mx-auto w-full max-w-sm"
        >
          <div className="w-full max-w-xs">
            <div className="relative">
              {/* Custom CSS for animations */}
              <style jsx>{`
                @keyframes flagHoist {
                  0% {
                    transform: translateY(20px);
                    opacity: 0;
                  }
                  100% {
                    transform: translateY(0);
                    opacity: 1;
                  }
                }

                @keyframes textWave {
                  0%,
                  100% {
                    transform: translateY(0);
                  }
                  50% {
                    transform: translateY(-3px);
                  }
                }

                @keyframes patrioticGlow {
                  0%,
                  100% {
                    filter: drop-shadow(0 0 5px rgba(255, 153, 51, 0.4));
                  }
                  33% {
                    filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.6));
                  }
                  66% {
                    filter: drop-shadow(0 0 5px rgba(0, 128, 0, 0.4));
                  }
                }

                .flag-hoist-animation {
                  animation: flagHoist 2s ease-out forwards,
                    textWave 3s ease-in-out infinite 2s,
                    patrioticGlow 4s ease-in-out infinite 2s;
                }
              `}</style>

              <div className="text-center pb-5 font-bold text-sm bg-gradient-to-r from-orange-600 via-white to-green-600 text-transparent bg-clip-text drop-shadow-md flag-hoist-animation">
                Indian server
              </div>
            </div>
            <input
              type="number"
              placeholder="ENTER YOUR UID"
              className="w-full text-center text-lg py-3 px-4 bg-white border-2 border-black rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-inner [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              onChange={handleChange}
              value={formdata.uid}
              name="uid"
              required
            />
          </div>
          <div className="w-full flex justify-center">
            {loading ? (
              <div className="p-3 bg-white rounded-full shadow-md">
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 text-blue-600 animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              </div>
            ) : (
              <button 
                type="submit"
                className="w-full max-w-[200px] bg-black text-xl font-bold text-white py-3 px-8 rounded-full hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95 cursor-ban"
              >
                REGISTER
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="mt-auto">
        <div className="flex gap-6 items-center justify-center py-6">
          <Link
            href="https://www.youtube.com/@R_Y_L_Shorts/videos"
            className="transform hover:scale-110 transition-all duration-300"
          >
            <FaYoutube className="text-6xl text-red-600 filter drop-shadow-lg hover:text-red-700" />
          </Link>
          <Link
            href="https://www.instagram.com/r_y_l_reels/"
            className="transform hover:scale-110 transition-all duration-300"
          >
            <FaInstagram className="text-5xl text-purple-600 filter drop-shadow-lg hover:text-purple-700" />
          </Link>
        </div>

        <footer className="bg-white/80 backdrop-blur-sm py-4 px-4 shadow-inner">
          <div className="text-center">
            <Link
              href="/admin"
              className="text-gray-600 hover:text-gray-800 text-sm font-medium hover:underline transition-colors duration-200"
            >
              Admin Login
            </Link>
          </div>
          <div className="text-center text-sm text-gray-500">
            Developed by Himanshu Raj
          </div>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;
