'use client'

import { useState } from "react"
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export function JoinRoom() {
    const [room, setRoom] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleJoinRoom = () => {
        if (!room.trim()) {
            setError("Room name cannot be empty");
            return;
        }
        if (room.length < 3) {
            setError("Room name must be at least 3 characters long");
            return;
        }
        if (room.length > 20) {
            setError("Room name must be less than 20 characters");
            return;
        }
        setError("");
        router.push(`/canvas/${room}`);
    };

    return (
        <div className="min-h-screen w-full flex justify-center items-center bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden">
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.1 }}
                transition={{ duration: 1.5, delay: 0.4, type: "spring" }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] 
                bg-teal-500 rounded-full z-0 blur-3xl"
            />
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md p-8 bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700/50 relative z-10"
            >
                <motion.h1 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-4xl font-bold text-teal-300 mb-6 text-center tracking-tight"
                >
                    Join a Room
                </motion.h1>
                
                <div className="space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <input 
                            type="text" 
                            placeholder="Enter room name" 
                            value={room}
                            onChange={(e) => {
                                setRoom(e.target.value);
                                setError("");
                            }}
                            onKeyPress={(e) => e.key === 'Enter' && handleJoinRoom()}
                            className="w-full px-4 py-3.5 rounded-lg bg-gray-700/50 text-white border border-gray-600 
                            focus:outline-none focus:border-teal-700 focus:ring-1 focus:ring-teal-700 
                            transition-all focus:shadow-lg placeholder-gray-400 backdrop-blur-sm"
                        />
                        {error && (
                            <motion.p 
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-2 text-red-400 text-sm bg-red-900/50 p-3 rounded-lg text-center"
                            >
                                {error}
                            </motion.p>
                        )}
                    </motion.div>

                    <motion.button 
                        onClick={handleJoinRoom}
                        whileHover={{ scale: 1.02, boxShadow: "0px 4px 20px rgba(0,0,0,0.25)" }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-3.5 px-4 bg-gradient-to-r from-teal-800 to-teal-700 
                        text-white rounded-full font-semibold hover:from-teal-700 hover:to-teal-600
                        hover:shadow-lg hover:shadow-teal-700/40 focus:outline-none focus:ring-2 
                        focus:ring-teal-700 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-300
                        relative overflow-hidden group"
                    >
                        <span className="relative z-10">Join Room</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-teal-500 opacity-0 
                        group-hover:opacity-100 transition-opacity duration-300"></div>
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
}