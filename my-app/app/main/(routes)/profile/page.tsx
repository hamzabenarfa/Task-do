"use client"
import ImageProfile from "@/components/ImageProfile";
import useUserData from "@/hooks/useUserData";

const Profile = () => {
    const userData = useUserData();
  

    return ( 
        <div className="flex items-center justify-center p-10">
            <ImageProfile size="default" profile={true} />

            <div className="ml-5">
                <h2 className="text-3xl font-bold">{userData?.name}</h2>
                <p className="text-gray-500">{userData?.email}</p>
            </div>
        </div>
    );
}
 
export default Profile;
