"use client"

import { useRouter } from "next/navigation";

import { Palette} from "lucide-react";

const Header = () => {
  const router = useRouter()
  return (
    <header className="bg-gray-900/80 backdrop-blur-md border-b border-teal-800 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="bg-gradient-to-br from-teal-400 to-teal-600 p-2 rounded-lg">
            <Palette className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-teal-400 to-teal-200 bg-clip-text text-transparent">
            DoodleFlow
          </span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-gray-300 hover:text-teal-400 transition-colors">Features</a>
          <a href="#about" className="text-gray-300 hover:text-teal-400 transition-colors">About</a>
        </nav>

        <button onClick={()=>{
          router.push('/auth')
        }}
          className="bg-gray-900/60 backdrop-blur border border-teal-700 text-teal-300 font-semibold px-5 py-1.5 rounded-lg shadow-md hover:bg-teal-800/60 hover:text-white hover:border-teal-400 transition-all duration-200 focus:outline-none"
        >
          Sign In
        </button>
      </div>
    </header>
  );
};

export default Header