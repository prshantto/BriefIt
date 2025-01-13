import { useState } from "react";
import { useSignOut, useUserData } from "@nhost/react";
import { Menu } from "lucide-react";

const ProfileButton = () => {
  const [showProfile, setShowProfile] = useState(false);
  const { signOut } = useSignOut();
  const user = useUserData();
  console.log(user);

  const handleToggleProfile = () => {
    setShowProfile(!showProfile);
  };

  const handleSignOut = async () => {
    await signOut();
    setShowProfile(false);
  };

  return (
    <div className="profile fixed md:absolute top-4 left-4 md:top-8 md:left-8 z-50">
      <button
        onClick={handleToggleProfile}
        className="profile-toggle p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
      >
        {showProfile ? (
          <Menu className="rotate-90 w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>
      {showProfile && (
        <>
          <div
            className="fixed inset-0 bg-black/20 md:hidden"
            onClick={handleToggleProfile}
          />
          <div className="profile-dropdown absolute left-0 mt-2 w-[280px] p-4 bg-white rounded-lg shadow-lg border border-gray-200">
            <div className="flex items-center gap-3">
              <img
                className="w-12 h-12 rounded-full bg-gray-500 object-cover"
                src={
                  user?.avatarUrl ||
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt="avatar"
              />
              <div className="font-medium">
                Hey! {user?.metadata?.firstname || "User"}
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-600 break-all">
              {user?.email}
            </div>

            <button
              className="w-full py-2 px-4 mt-4 bg-indigo-600 text-white border-none rounded-md font-medium cursor-pointer transition-colors duration-200 hover:bg-indigo-700 active:bg-indigo-800"
              onClick={handleSignOut}
            >
              Sign out
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileButton;
