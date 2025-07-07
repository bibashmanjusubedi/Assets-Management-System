
const LogoutPage = () => {
  const handleCancel = () => {
    
    window.location.href = "/"; 
  };

  const handleLogout = () => {
   
    localStorage.removeItem("authToken");
    alert("You have been logged out.");
    window.location.href = "/login"; 
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-md text-center w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Logout</h2>
        <p className="text-gray-600 mb-6">Are you sure you want to log out?</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleCancel}
            className="bg-teal-500 hover:bg-gray-400 text-white font-medium py-2 px-4 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleLogout}
            className="bg-teal-500 hover:bg-gray-400 text-white font-medium py-2 px-4 rounded"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutPage;


