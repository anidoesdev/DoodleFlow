"use client"

import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import useAuth from "@/hooks/useAuth";
import axios from "axios";
import { BACKEND_URL } from "@/app/config";
import { Palette } from "lucide-react";

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
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth()
  const initialIsSignIn = searchParams.get('mode') !== 'signup';
  const [isSignIn, setIsSignIn] = useState(initialIsSignIn);

  //handle submit
  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try{
      const endpoint = isSignIn ? '/signin' : '/signup'
      const response = await axios.post(`${BACKEND_URL}${endpoint}`,{
        username,
        password,
        ...(isSignIn ? {} : { name })
      })
      if(response.data.token){
        await login(response.data.token)
      }else{
        setError('Authentication failed. Please try again')
      }
    }catch(err: any){
      setError(err?.response?.data?.message || 'An error occurred. Please try again.');
    }finally{
      setLoading(false)
    }

  }



  // Animation variants for left and right panels
  const leftPanelMotion = (isSignIn: boolean) => ({
    initial: { x: isSignIn ? 0 : -400, opacity: 0, scale: 0.98, zIndex: 2 },
    animate: { x: 0, opacity: 1, scale: 1, zIndex: 2, transition: { duration: 0.45 } },
    exit: { x: isSignIn ? 400 : -400, opacity: 0, scale: 0.98, zIndex: 2, transition: { duration: 0.45 } },
  });
  const rightPanelMotion = (isSignIn: boolean) => ({
    initial: { x: isSignIn ? -400 : 0, opacity: 0, scale: 0.98, zIndex: 2 },
    animate: { x: 0, opacity: 1, scale: 1, zIndex: 2, transition: { duration: 0.45 } },
    exit: { x: isSignIn ? -400 : 400, opacity: 0, scale: 0.98, zIndex: 2, transition: { duration: 0.45 } },
  });

  // Helper to render the form
  const renderForm = (signIn: boolean) => (
    <>
      <div className="w-full max-w-sm">
        <h2 className="text-3xl font-bold text-teal-300 mb-6 tracking-tight">
          {signIn ? 'Welcome Back' : 'Create Account'}
        </h2>
        <p className="text-gray-400 mb-8 text-sm">
          {signIn ? 'Sign in to continue your journey' : 'Join us and start creating'}
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {!signIn && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                className="w-full bg-gray-700/50 text-white border border-gray-600 rounded-lg px-4 py-3 
                focus:outline-none focus:border-teal-700 focus:ring-1 focus:ring-teal-700 
                transition-all focus:shadow-lg placeholder-gray-400 backdrop-blur-sm"
              />
            </motion.div>
          )}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <input
              type="email"
              placeholder="Email"
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
              className="w-full bg-gray-700/50 text-white border border-gray-600 rounded-lg px-4 py-3 
              focus:outline-none focus:border-teal-700 focus:ring-1 focus:ring-teal-700 
              transition-all focus:shadow-lg placeholder-gray-400 backdrop-blur-sm"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="w-full bg-gray-700/50 text-white border border-gray-600 rounded-lg px-4 py-3 
              focus:outline-none focus:border-teal-700 focus:ring-1 focus:ring-teal-700 
              transition-all focus:shadow-lg placeholder-gray-400 backdrop-blur-sm"
            />
          </motion.div>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02, boxShadow: "0px 4px 20px rgba(0,0,0,0.25)" }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-teal-800 to-teal-700 text-white rounded-full py-3.5 
            font-semibold mt-2 hover:from-teal-700 hover:to-teal-600 transition-all duration-300 
            shadow-sm hover:shadow-md relative overflow-hidden group"
          >
            <span className="relative z-10">{signIn ? 'SIGN IN' : 'SIGN UP'}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-teal-500 opacity-0 
            group-hover:opacity-100 transition-opacity duration-300"></div>
          </motion.button>
        </form>
      </div>
    </>
  );

  // Helper to render the info panel
  const renderInfo = (signIn: boolean) => {
    const idx = signIn ? 0 : 1;
    return (
      <>
        <div className="absolute top-8 left-8 flex items-center gap-3">
          <div className="bg-white/10 backdrop-blur-sm rounded-full w-12 h-12 flex items-center justify-center 
          border border-white/20 shadow-lg">
            <span className="text-white font-bold text-2xl"><Palette className="h-6 w-6 text-white" /></span>
          </div>
          <span className="font-bold text-xl text-white tracking-tight">DoodleFlow</span>
        </div>
        <div className="text-center max-w-sm">
          <h2 className="text-4xl font-bold mb-4 mt-16 text-white tracking-tight">{leftPanelContent[idx].title}</h2>
          <p className="mb-10 text-center text-gray-300 leading-relaxed">{leftPanelContent[idx].desc}</p>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0px 4px 20px rgba(0,0,0,0.25)" }}
            whileTap={{ scale: 0.98 }}
            className="border border-white/30 rounded-full px-10 py-3 font-semibold hover:bg-white/10 
            transition-all duration-300 backdrop-blur-sm text-white shadow-lg hover:shadow-xl"
            onClick={() => setIsSignIn(!signIn)}
          >
            {leftPanelContent[signIn ? 0 : 1].button}
          </motion.button>
        </div>
      </>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden">
      {/* Animated Background Shapes */}
      <motion.div
        initial={{ scale: 0, opacity: 0, x: -100, y: 100 }}
        animate={{ scale: 1, opacity: 0.1, x: 0, y: 0 }}
        transition={{ duration: 1.5, delay: 0.2, type: "spring" }}
        className="absolute left-[-120px] bottom-[-120px] w-[400px] h-[400px] bg-teal-400 rounded-full z-0 blur-2xl"
      />
      <motion.div
        initial={{ scale: 0, opacity: 0, x: 100, y: -100 }}
        animate={{ scale: 1, opacity: 0.1, x: 0, y: 0 }}
        transition={{ duration: 1.5, delay: 0.3, type: "spring" }}
        className="absolute right-[-120px] top-[-120px] w-[400px] h-[400px] bg-teal-400 rounded-full z-0 blur-2xl"
      />
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.1 }}
        transition={{ duration: 1.5, delay: 0.4, type: "spring" }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] 
        bg-teal-500 rounded-full z-0 blur-3xl"
      />
      <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-2xl flex w-[900px] overflow-hidden 
      border border-gray-700/50 relative z-10 h-[600px]">
        {/* Left Panel */}
        <div className="relative w-1/2 h-full">
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={isSignIn ? 'left-info' : 'left-signup'}
              className={isSignIn ? "absolute inset-0 bg-gradient-to-br from-teal-900 to-teal-800 text-white flex flex-col justify-center items-center p-12" : "absolute inset-0 flex flex-col justify-center items-center p-12 bg-gray-800/50 backdrop-blur-xl"}
              {...leftPanelMotion(isSignIn)}
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
              className={isSignIn ? "absolute inset-0 flex flex-col justify-center items-center p-12 bg-gray-800/50 backdrop-blur-xl" : "absolute inset-0 bg-gradient-to-br from-teal-900 to-teal-800 text-white flex flex-col justify-center items-center p-12"}
              {...rightPanelMotion(isSignIn)}
            >
              {isSignIn ? renderForm(true) : renderInfo(false)}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
