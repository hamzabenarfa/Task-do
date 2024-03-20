"use client"
import { useState, useEffect } from 'react';
import useUserData from "@/hooks/useUserData";
import userService from "@/service/user.service";
import { User } from "lucide-react";

const Profile = () => {
    const userData = useUserData();
    const [profileImageUrl, setProfileImageUrl] = useState(null);

    useEffect(() => {
        const fetchProfileImage = async () => {
            try {
                if (userData && userData.profileImage) {
                    const imageData = await userService.getImageProfile(userData.profileImage);
                    const imageUrl = URL.createObjectURL(imageData); // Convert Blob to URL
                    setProfileImageUrl(imageUrl);
                }
            } catch (error) {
                console.error("Error fetching profile image:", error);
            }
        };

        fetchProfileImage();

        return () => {
            if (profileImageUrl) {
                URL.revokeObjectURL(profileImageUrl);
            }
        };
    }, [userData]);

    return ( 
        <div className="flex items-center justify-center p-10">
            {profileImageUrl ? (
                <img src={profileImageUrl} alt="Profile" className="rounded-full object-cover w-14 h-14 " />
            ) : (
                <User size="64" className="bg-teal-400/40 p-1 rounded-full" />
            )}
        </div>
    );
}
 
export default Profile;
