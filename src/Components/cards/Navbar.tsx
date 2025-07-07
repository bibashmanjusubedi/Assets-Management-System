import axios from "axios";
import { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { FaChevronDown } from "react-icons/fa";
import { useNavigate } from "react-router";
import { ModeToggle } from "../theme-switch";
import { api } from "@/lib/api"; 

type User = {
  name: string;
  email: string;
  isAdmin?: boolean;
};

const Navbar = () => {
  const [user, setUser] = useState<User | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showUnableLogin, setShowUnableLogin] = useState(false);
  const [showResetForm, setShowResetForm] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [retypeNewPassword, setRetypeNewPassword] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [resetNewPassword, setResetNewPassword] = useState("");
  const [resetRetypeNewPassword, setResetRetypeNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser && storedUser !== "undefined" && storedUser !== "null") {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser && typeof parsedUser === "object") {
          setUser(parsedUser);
        }
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage:", error);
    }
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        "https://asset-management-system-2y9g.onrender.com/api/user/logout/"
      );
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess("");
    if (!oldPassword || !newPassword || !retypeNewPassword) {
      setPasswordError("All fields are required.");
      return;
    }
    if (newPassword !== retypeNewPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }
    try {

      await api.post(
        "user/change-password/",
        {
          old_password: oldPassword,
          new_password: newPassword,
        
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setPasswordSuccess("Password changed successfully!");
      setOldPassword("");
      setNewPassword("");
      setRetypeNewPassword("");
      setTimeout(() => {
        setShowChangePassword(false);
        setPasswordSuccess("");
        setShowDropdown(false);
      }, 1500);
    } catch (error) {
      console.error("Error changing password:", error);
      let message = "Failed to change password.";
      if (axios.isAxiosError(error) && error.response) {
        message =
          error.response.data?.detail ||
          error.response.data?.message ||
          message;
      }
      setPasswordError(message);
    }
  };

  const handleUnableLoginEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResetForm(true);
  };

  const handleUnableLoginReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess("");
    if (!resetNewPassword || !resetRetypeNewPassword) {
      setPasswordError("All fields are required.");
      return;
    }
    if (resetNewPassword !== resetRetypeNewPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }

    setPasswordSuccess("Password reset successfully!");
    setResetEmail("");
    setResetNewPassword("");
    setResetRetypeNewPassword("");
    setTimeout(() => {
      setShowUnableLogin(false);
      setShowResetForm(false);
      setPasswordSuccess("");
      setShowDropdown(false);
    }, 1500);
  };

  const handleCancel = () => {
    setShowDropdown(false);
    setShowLogoutConfirm(false);
    setShowChangePassword(false);
    setShowUnableLogin(false);
    setShowResetForm(false);
    setOldPassword("");
    setNewPassword("");
    setRetypeNewPassword("");
    setResetEmail("");
    setResetNewPassword("");
    setResetRetypeNewPassword("");
    setPasswordError("");
    setPasswordSuccess("");
  };

  return (
    <div className=" fixed top-0 w-full bg-gradient-to-r from-[#206D85] via-[#70C5AE] to-[#6DCC4E] py-2 shadow-md z-10">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center relative ">
        <div className="relative w-full max-w-md mr-15 ">
          <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white text-xl pointer-events-none" />
          <input
            type="text"
            placeholder="Search"
            className="w-75 border border-gray-100 pl-12 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm text-white text-xl font-semibold bg-transparent"
          />
        </div>

       <div className="relative flex items-center gap-3 text-white font-medium ">
  <ModeToggle />
  <div
    className="flex items-center cursor-pointer"
    onClick={() => setShowDropdown(!showDropdown)}
  >
    <span className="mr-25">Welcome, {user?.name || "User"}</span>
    <FaChevronDown className="text-white text-sm" />
  </div>
  {/* ...dropdown... */}
          {showDropdown && (
            <div className="absolute right-0 top-14 w-64 bg-white text-black rounded-lg shadow-xl  z-50 space-y-3 mr-10">
              <div className="border-b pb-2">
                <p className="font-semibold">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>

              {!showChangePassword && !showUnableLogin && (
                <button
                  onClick={() => {
                    setShowChangePassword(true);
                    setShowLogoutConfirm(false);
                    setPasswordError("");
                    setPasswordSuccess("");
                  }}
                  className="w-full bg-teal-600 text-white py-2 rounded text-sm hover:bg-teal-700 transition"
                >
                  Change Password
                </button>
              )}

              {showChangePassword && (
                <form
                  onSubmit={handleChangePassword}
                  className="space-y-2 text-sm"
                >
                  <input
                    type="password"
                    placeholder="Current Password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="w-full border px-3 py-1.5 rounded focus:border-green-500 hover:border-green-500"
                  />
                  <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full border px-3 py-1.5 rounded focus:border-green-500 hover:border-green-500"
                  />
                  <input
                    type="password"
                    placeholder="Confirm New Password"
                    value={retypeNewPassword}
                    onChange={(e) => setRetypeNewPassword(e.target.value)}
                    className="w-full border px-3 py-1.5 rounded focus:border-green-500 hover:border-green-500"
                  />
                  {passwordError && (
                    <div className="text-xs text-red-600">{passwordError}</div>
                  )}
                  {passwordSuccess && (
                    <div className="text-xs text-green-600">
                      {passwordSuccess}
                    </div>
                  )}
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="flex-1 bg-teal-600 text-white py-1.5 rounded hover:bg-teal-700"
                    >
                      Submit
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="flex-1 bg-gray-200 text-black py-1.5 rounded hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              {!showChangePassword &&
                !showLogoutConfirm &&
                !showUnableLogin && (
                  <button
                    onClick={() => setShowLogoutConfirm(true)}
                    className="w-full bg-red-500 text-white py-2 rounded text-sm hover:bg-red-600 transition"
                  >
                    Logout
                  </button>
                )}

              {showLogoutConfirm && !showChangePassword && !showUnableLogin && (
                <div className="space-y-2 text-sm">
                  <p className="text-gray-700 pl-2">
                    Are you sure you want to logout?
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={handleLogout}
                      className="flex-1 bg-red-500 text-white py-1.5 rounded hover:bg-red-600 ml-2"
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => setShowLogoutConfirm(false)}
                      className="flex-1 bg-gray-200 text-black py-1.5 rounded hover:bg-gray-300"
                    >
                      No
                    </button>
                  </div>
                </div>
              )}

              {!showChangePassword && !showUnableLogin && (
                <div className="text-center">
                  <button
                    className="text-blue-600 underline text-xs mt-2"
                    onClick={() => {
                      setShowUnableLogin(true);
                      setShowLogoutConfirm(false);
                      setShowChangePassword(false);
                      setPasswordError("");
                      setPasswordSuccess("");
                    }}
                  >
                    Unable to login?
                  </button>
                </div>
              )}

              {showUnableLogin && !showResetForm && (
                <form
                  onSubmit={handleUnableLoginEmail}
                  className="space-y-2 text-sm"
                >
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    className="w-full border px-3 py-1.5 rounded"
                  />
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="flex-1 bg-teal-600 text-white py-1.5 rounded hover:bg-teal-700"
                    >
                      Submit
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="flex-1 bg-gray-200 text-black py-1.5 rounded hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              {showUnableLogin && showResetForm && (
                <form
                  onSubmit={handleUnableLoginReset}
                  className="space-y-2 text-sm"
                >
                  <input
                    type="password"
                    placeholder="New Password"
                    value={resetNewPassword}
                    onChange={(e) => setResetNewPassword(e.target.value)}
                    className="w-full border px-3 py-1.5 rounded"
                  />
                  <input
                    type="password"
                    placeholder="Confirm New Password"
                    value={resetRetypeNewPassword}
                    onChange={(e) => setResetRetypeNewPassword(e.target.value)}
                    className="w-full border px-3 py-1.5 rounded"
                  />
                  {passwordError && (
                    <div className="text-xs text-red-600">{passwordError}</div>
                  )}
                  {passwordSuccess && (
                    <div className="text-xs text-green-600">
                      {passwordSuccess}
                    </div>
                  )}
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="flex-1 bg-teal-600 text-white py-1.5 rounded hover:bg-teal-700"
                    >
                      Submit
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="flex-1 bg-gray-200 text-black py-1.5 rounded hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              {!showChangePassword && !showUnableLogin && (
                <button
                  onClick={handleCancel}
                  className="w-full bg-gray-200 text-black py-2 rounded text-sm hover:bg-gray-300"
                >
                  Close
                </button>
              )}
            </div>
          )}
        </div>
      </div>
</div>

  
  );
};

export default Navbar;

