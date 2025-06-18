"use client"

import { useRouter } from "next/navigation";

import { ArrowRight, Play, Palette } from "lucide-react";

const Hero = () => {
  const router = useRouter()
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-teal-900 min-h-[90vh] flex items-center">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-teal-600/10 to-cyan-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-teal-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                  Draw.
                </span>
                <br />
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

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-semibold rounded-full px-6 py-2 shadow-lg hover:shadow-xl transition-all duration-300 group flex items-center justify-center"
                onClick={()=>{
                  router.push("/auth")
                }}
              >
                Start Drawing
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button> 
              
              <button
                className="border-2 border-teal-400 text-teal-300 font-semibold rounded-full px-6 py-2 bg-transparent hover:bg-teal-500/10 hover:text-white hover:border-teal-300 transition-all duration-300 group flex items-center justify-center"
              >
                <Play className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                Quick Demo
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gray-800/50 backdrop-blur rounded-2xl shadow-2xl p-8 relative overflow-hidden border border-teal-500/20">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-900/20 to-cyan-900/20"></div>
              
              <div className="relative bg-gray-900 rounded-lg border-2 border-dashed border-teal-400/50 h-80 flex items-center justify-center">
                <div className="space-y-4 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full mx-auto flex items-center justify-center">
                    <Palette className="h-8 w-8 text-white" />
                  </div>
                  <p className="text-teal-300 font-medium">Ready to draw?</p>
                </div>
              </div>
              
              <div className="flex justify-center space-x-2 mt-4">
                <div className="w-8 h-8 bg-teal-500 rounded"></div>
                <div className="w-8 h-8 bg-cyan-400 rounded"></div>
                <div className="w-8 h-8 bg-teal-300 rounded"></div>
                <div className="w-8 h-8 bg-gray-500 rounded"></div>
              </div>
            </div>

            <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-cyan-400/30 to-teal-500/30 rounded-full animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-teal-400/30 to-cyan-500/30 rounded-full animate-pulse delay-1000"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 
