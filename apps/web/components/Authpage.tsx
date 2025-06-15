"use client"

import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const leftPanelContent = [
  {
    title: "Welcome Back!",
    desc: "To keep connected with us please login with your personal info",
    button: "SIGN UP",
    buttonRoute: "/signup",
  },
  {
    title: "Hello, Friend!",
    desc: "Enter your personal details and start your journey with us",
    button: "SIGN IN",
    buttonRoute: "/signin",
  },
];


export default function AuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialIsSignIn = searchParams.get('mode') !== 'signup';
  const [isSignIn, setIsSignIn] = useState(initialIsSignIn);
  const [isSwapping, setIsSwapping] = useState(false);

  // Helper to render the form
  const renderForm = (signIn: boolean) => (
    <>
      <h2 className="text-2xl font-bold text-teal-600 mb-4">
        {signIn ? 'Sign In' : 'Create Account'}
      </h2>
      <form className="flex flex-col gap-3 w-72">
        {!signIn && (
          <input
            type="text"
            placeholder="Name"
            className="border border-teal-100 rounded-lg px-4 py-2 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all focus:shadow-lg"
          />
        )}
        <input
          type="email"
          placeholder="Email"
          className="border border-teal-100 rounded-lg px-4 py-2 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all focus:shadow-lg"
        />
        <input
          type="password"
          placeholder="Password"
          className="border border-teal-100 rounded-lg px-4 py-2 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all focus:shadow-lg"
        />
        <motion.button
          type="submit"
          whileHover={{ scale: 1.04, boxShadow: "0px 4px 16px rgba(0,0,0,0.10)" }}
          whileTap={{ scale: 0.98 }}
          className="bg-gradient-to-r from-teal-600 to-teal-500 text-white rounded-full py-2 font-semibold mt-2 hover:from-teal-500 hover:to-teal-600 transition-all duration-300 shadow-sm hover:shadow-md"
        >
          {signIn ? 'SIGN IN' : 'SIGN UP'}
        </motion.button>
      </form>
    </>
  );

  // Helper to render the info panel
  const renderInfo = (signIn: boolean) => {
    const idx = signIn ? 0 : 1;
    return (
      <>
        <div className="absolute top-6 left-6 flex items-center gap-2">
          <div className="bg-white/10 backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center border border-white/20">
            <span className="text-white font-bold text-xl">Ex</span>
          </div>
          <span className="font-bold text-lg">Excalidraw</span>
        </div>
        <h2 className="text-3xl font-bold mb-2 mt-10">{leftPanelContent[idx].title}</h2>
        <p className="mb-8 text-center text-teal-50">{leftPanelContent[idx].desc}</p>
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0px 4px 16px rgba(0,0,0,0.10)" }}
          whileTap={{ scale: 0.98 }}
          className="border border-white/30 rounded-full px-8 py-2 font-semibold hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
          onClick={() => {
            setIsSwapping(true);
            setTimeout(() => {
              setIsSignIn(!signIn);
              setIsSwapping(false);
            }, 600);
          }}
          disabled={isSwapping}
        >
          {leftPanelContent[signIn ? 0 : 1].button}
        </motion.button>
      </>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-teal-100 relative overflow-hidden">
      {/* Animated Background Shapes */}
      <motion.div
        initial={{ scale: 0, opacity: 0, x: -100, y: 100 }}
        animate={{ scale: 1, opacity: 0.15, x: 0, y: 0 }}
        transition={{ duration: 1, delay: 0.2, type: "spring" }}
        className="absolute left-[-120px] bottom-[-120px] w-[320px] h-[320px] bg-yellow-300 rounded-full z-0"
      />
      <motion.div
        initial={{ scale: 0, opacity: 0, x: 100, y: -100 }}
        animate={{ scale: 1, opacity: 0.15, x: 0, y: 0 }}
        transition={{ duration: 1, delay: 0.3, type: "spring" }}
        className="absolute right-[-120px] top-[-120px] w-[320px] h-[320px] bg-rose-400 rounded-full z-0"
      />
      <div className="bg-white rounded-xl shadow-xl flex w-[800px] overflow-hidden border border-teal-100 relative z-10 h-[500px]">
        {/* Left Panel */}
        <div className="relative w-1/2 h-full">
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={isSignIn ? 'left-info' : 'left-signup'}
              className={isSignIn ? "absolute inset-0 bg-gradient-to-br from-teal-600 to-teal-500 text-white flex flex-col justify-center items-center p-10" : "absolute inset-0 flex flex-col justify-center items-center p-10 bg-white"}
              initial={{ x: -80, opacity: 0, scale: 0.95, zIndex: 2 }}
              animate={{ x: 0, opacity: 1, scale: 1, zIndex: 2 }}
              exit={{ x: 0, opacity: 0, scale: 0.95, zIndex: 2 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              {isSignIn ? renderInfo(true) : renderForm(false)}
            </motion.div>
          </AnimatePresence>
        </div>
        {/* Right Panel */}
        <div className="relative w-1/2 h-full">
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={isSignIn ? 'right-signin' : 'right-info'}
              className={isSignIn ? "absolute inset-0 flex flex-col justify-center items-center p-10 bg-white" : "absolute inset-0 bg-gradient-to-br from-teal-600 to-teal-500 text-white flex flex-col justify-center items-center p-10"}
              initial={{ x: 80, opacity: 0, scale: 0.95, zIndex: 1 }}
              animate={{ x: 0, opacity: 1, scale: 1, zIndex: 1 }}
              exit={{ x: 0, opacity: 0, scale: 0.95, zIndex: 1 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              {isSignIn ? renderForm(true) : renderInfo(false)}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
