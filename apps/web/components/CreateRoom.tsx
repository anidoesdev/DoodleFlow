"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import  useAuth  from '@/hooks/useAuth';
import { BACKEND_URL } from '@/app/config';
import axios from 'axios';
import { motion } from 'framer-motion';

export default function RoomPage() {
    const [roomName, setRoomName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { token, isAuthenticated, loading: authLoading } = useAuth();

    // Redirect if not authenticated
    if (!authLoading && !isAuthenticated) {
        router.push('/');
        return null;
    }

    const handleCreateRoom = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await axios.post(
                `${BACKEND_URL}/room`,
                { name: roomName },
                {
                    headers: {
                        Authorization: `${token}`
                    }
                }
            );
            const roomId = response.data.roomId
            if (roomId) {
                router.push(`/canvas/${roomName}`);
            }
        } catch (error: any) {
            setError(error.response?.data?.message || 'Failed to create room. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (authLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-700"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-4 relative overflow-hidden">
           
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
                className="w-full max-w-md relative z-10"
            >
                <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-gray-700/50">
                    <div className="text-center mb-10">
                        <motion.h1 
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-4xl font-bold text-teal-300 mb-3 tracking-tight"
                        >
                            Create a Room
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="text-gray-400"
                        >
                            Start a new conversation with others
                        </motion.p>
                    </div>

                    <form onSubmit={handleCreateRoom} className="space-y-6">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="group"
                        >
                            <label htmlFor="roomName" className="block text-sm font-medium text-gray-300 mb-2 group-hover:text-teal-300 transition-colors">
                                Room Name
                            </label>
                            <input
                                id="roomName"
                                type="text"
                                value={roomName}
                                onChange={(e) => setRoomName(e.target.value)}
                                className="w-full px-4 py-3.5 rounded-lg bg-gray-700/50 text-white border border-gray-600 
                                focus:outline-none focus:border-teal-700 focus:ring-1 focus:ring-teal-700 
                                transition-all focus:shadow-lg placeholder-gray-400 backdrop-blur-sm"
                                placeholder="Enter room name"
                                required
                                minLength={3}
                                maxLength={20}
                            />
                        </motion.div>

                        {error && (
                            <motion.div 
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-red-400 text-sm text-center bg-red-900/50 p-3 rounded-lg"
                            >
                                {error}
                            </motion.div>
                        )}

                        <motion.button
                            type="submit"
                            disabled={loading}
                            whileHover={{ scale: 1.02, boxShadow: "0px 4px 20px rgba(0,0,0,0.25)" }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full bg-gradient-to-r from-teal-800 to-teal-700 
                            text-white py-3.5 px-6 rounded-full font-semibold 
                            hover:from-teal-700 hover:to-teal-600
                            hover:shadow-lg hover:shadow-teal-700/40 
                            focus:outline-none focus:ring-2 focus:ring-teal-700 focus:ring-offset-2 focus:ring-offset-gray-800
                            transition-all duration-300 transform hover:-translate-y-0.5
                            disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                        >
                            <span className="relative z-10">{loading ? "Creating..." : "Create Room"}</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-teal-500 opacity-0 
                            group-hover:opacity-100 transition-opacity duration-300"></div>
                        </motion.button>
                    </form>

                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="mt-10 text-center"
                    >
                        <p className="text-sm text-gray-400">
                            Want to join an existing room?{' '}
                            <button
                                onClick={() => router.push(`/canvas/join`)}
                                className="text-teal-300 hover:text-teal-200 font-medium 
                                hover:underline decoration-2 underline-offset-4 transition-all duration-200"
                            >
                                Join Room
                            </button>
                        </p>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
} 