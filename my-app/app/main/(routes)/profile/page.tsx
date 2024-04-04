"use client"
import ImageProfile from "@/components/ImageProfile";
import useUserData from "@/hooks/useUserData";
import axios from 'axios';
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useState } from 'react';
const Profile = () => {
    const userData = useUserData();
    const token = localStorage.getItem('accessToken');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const resetPassword = async (e) => {
        e.preventDefault();

        try {
             await axios.post('http://localhost:4000/user/reset-password', {
                currentPassword,
                newPassword
            },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            alert('Password successfully updated!');

            setCurrentPassword('');
            setNewPassword('');
        } catch (error) {
            console.error('Failed to reset password:', error);
            alert('Failed to update password.');
        }
    };

    return (
        <div className="flex min-h-screen bg-white flex-col items-center gap-10 justify-start p-10">

            <div className="flex items-center justify-center gap-10  w-full">
                <Link href="/main/dashboard">
                    <ChevronLeft size={40} className="cursor-pointer hover:bg-slate-300/30 rounded-xl " />
                </Link>
                <div className="flex">
                    <ImageProfile size="default" profile={true} />
                    <div className="ml-5">
                        <h2 className="text-3xl font-bold">{userData?.name}</h2>
                        <p className="text-gray-500">{userData?.email}</p>
                    </div>
                </div>
            </div>

            <div>
                <form onSubmit={resetPassword} className="mt-4">
                    <div className="mb-4">
                        <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">Current Password</label>
                        <input
                            type="password"
                            id="currentPassword"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            required
                            className="mt-1 px-3 py-2 border shadow-sm border-gray-300 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-blue-500 block w-full rounded-md sm:text-sm focus:ring-1"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
                        <input
                            type="password"
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            className="mt-1 px-3 py-2 border shadow-sm border-gray-300 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-blue-500 block w-full rounded-md sm:text-sm focus:ring-1"
                        />
                    </div>
                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-500 focus:ring-opacity-50">
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Profile;
