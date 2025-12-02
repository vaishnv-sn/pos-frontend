import React from "react";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";

const OrderHeader = ({ title = "Header", logoutLogo = false }) => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="w-full bg-[#1950AF] text-white py-2 px-4 shadow flex items-center justify-between relative">
      <div className="flex-1"></div>
      <h1 className="text-lg font-semibold tracking-wide">{title}</h1>
      <div className="flex-1 flex justify-end">
        {logoutLogo && (
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-1.5 hover:bg-white/10 rounded-lg transition-colors"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm">Logout</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderHeader;
