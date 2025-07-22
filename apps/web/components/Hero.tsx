"use client"

import { useRouter } from "next/navigation";

import { ArrowRight} from "lucide-react";

const Hero = () => {
  const router = useRouter()
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-teal-900 min-h-screen flex items-center justify-center">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-teal-600/10 to-cyan-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className=" gap-12 items-center justify-items-center text-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-teal-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                  Draw.
                </span>
                <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-teal-300 bg-clip-text text-transparent">
                  Sketch.
                </span>
                <br />
                <span className="text-gray-100">Have Fun.</span>
              </h1>
              
              <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
                A simple drawing tool for doodling, sketching, and letting your creativity flow. 
                No fancy features, just pure drawing fun.
              </p>
            </div>

            <div className="flex items-center justify-center sm:flex-row gap-4">
              <button
                className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-semibold rounded-full px-6 py-2 shadow-lg hover:shadow-xl transition-all duration-300 group flex items-center justify-center"
                onClick={()=>{
                  router.push("/auth")
                }}
              >
                Start Drawing
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button> 
              
              {/* <button
                className="border-2 border-teal-400 text-teal-300 font-semibold rounded-full px-6 py-2 bg-transparent hover:bg-teal-500/10 hover:text-white hover:border-teal-300 transition-all duration-300 group flex items-center justify-center"
              >
                <Play className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                Quick Demo
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 
