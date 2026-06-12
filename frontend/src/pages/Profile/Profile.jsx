import { UserProfile } from "@clerk/clerk-react";

const Profile = () => {
  return (
    <div className="min-h-screen w-full bg-[#f5f5f5] py-10 px-4 flex items-center justify-center overflow-y-auto">
      <UserProfile routing="hash" />
    </div>
  );
};

export default Profile;
