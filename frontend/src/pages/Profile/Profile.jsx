import { useEffect, useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import { useAuthStore } from "../../store/store";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, updateProfile, fetchProfile, loading, error, clearError } = useAuthStore();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  useEffect(() => {
    if (user) {
      setFormData({ name: user.name || "", email: user.email || "" });
    }
  }, [user]);

  const handleSave = async () => {
    clearError();
    setSuccessMsg("");
    try {
      await updateProfile(formData);
      setIsEditing(false);
      setSuccessMsg("Profile updated successfully!");
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch {
      // error handled by store
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen w-full bg-[#f5f5f5] flex items-center justify-center">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#f5f5f5] py-10 px-4 flex items-start justify-center overflow-y-auto">
      <div className="w-full max-w-5xl bg-white/30 backdrop-blur-md p-6 rounded-3xl shadow-xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <h2 className="text-xl font-medium">
              Welcome to <span className="text-[#B88E2F] font-semibold">Furnio</span>
            </h2>
            <p className="text-sm text-gray-600">Today, {new Date().toLocaleDateString()}</p>
          </div>
          <div className="mt-4 sm:mt-0 flex gap-2">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="bg-[#B88E2F] text-white px-5 py-1.5 rounded-lg hover:bg-[#8E6F24] transition disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Save"}
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setFormData({ name: user.name, email: user.email });
                    clearError();
                  }}
                  className="bg-gray-200 text-gray-700 px-5 py-1.5 rounded-lg hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-[#B88E2F] text-white px-5 py-1.5 rounded-lg hover:bg-[#8E6F24] transition"
              >
                Edit
              </button>
            )}
          </div>
        </div>

        {/* Messages */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}
        {successMsg && (
          <div className="mb-4 p-3 bg-green-100 border border-green-300 text-green-700 rounded-lg text-sm">
            {successMsg}
          </div>
        )}

        {/* Profile Info */}
        <div className="flex flex-col sm:flex-row gap-4 items-start mb-6">
          <div className="w-20 h-20 rounded-full bg-[#B88E2F] flex items-center justify-center text-white text-2xl font-bold">
            {user.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>
          <div>
            <h3 className="text-md font-semibold">{user.name}</h3>
            <p className="text-sm text-gray-700">{user.email}</p>
          </div>
        </div>

        {/* Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              disabled={!isEditing}
              className="w-full bg-white border border-gray-300 px-3 py-1.5 rounded-lg outline-none disabled:bg-gray-100 disabled:text-gray-500 focus:ring-2 focus:ring-[#B88E2F] transition-shadow"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Email Address</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              disabled={!isEditing}
              className="w-full bg-white border border-gray-300 px-3 py-1.5 rounded-lg outline-none disabled:bg-gray-100 disabled:text-gray-500 focus:ring-2 focus:ring-[#B88E2F] transition-shadow"
            />
          </div>
        </div>

        {/* Email Section */}
        <div className="mt-6">
          <h4 className="text-sm font-semibold mb-2">My Email Address</h4>
          <div className="flex items-center gap-3 text-sm mb-2">
            <FaEnvelope className="text-[#B88E2F]" />
            <div>
              <p>{user.email}</p>
              <span className="text-gray-500 text-xs">
                Member since {new Date(user.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <div className="mt-8 pt-4 border-t border-gray-200">
          <button
            onClick={async () => {
              await useAuthStore.getState().logout();
              navigate("/login");
            }}
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-medium"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
