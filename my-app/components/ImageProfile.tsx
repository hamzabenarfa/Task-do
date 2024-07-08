'use client'

import { useState, useEffect } from 'react';
import useUserData from "@/hooks/useUserData";
import userService from "@/service/user.service";
import { Upload } from "lucide-react";

import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const ImageProfile = ({ className, size, profile = false }:any) => {
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

    const imageVariants = cva(
        "rounded-full object-cover",
        {
            variants: {
                size: {
                    default: "w-20 h-20",
                    sm: "w-10 h-10",
                    lg: "w-40 h-40",
                }
            },
        },
    );

    const handleUploadClick = async () => {
        try {
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = 'image/*';
            fileInput.onchange = async (event) => {
                const file = event.target.files[0];
                const response = await userService.uploadImageProfile(file);
                if (response) {
                    const imageUrl = URL.createObjectURL(file);
                    setProfileImageUrl(imageUrl);
                }
            };
            fileInput.click();
        } catch (error) {
            console.error("Error uploading profile image:", error);
        }
    };
    return (
        <div className="relative">
            {profileImageUrl  && (
                <img src={profileImageUrl} alt="Profile" className={cn(imageVariants({ size, className }))} />

            ) }
            {profile && !profileImageUrl && (
                <div className="bg-gray-200 w-20 h-20 rounded-full" >
                </div>
            )}
            {profile && (
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <Upload size={28} className="text-white cursor-pointer" onClick={handleUploadClick} />
                </div>
            )}
        </div>
    );
}

export default ImageProfile;