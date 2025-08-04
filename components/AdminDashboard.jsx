"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { toast, Toaster } from "sonner";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/api/users");
      setUsers(response.data.users);
      setLoading(false);
    } catch (error) {
      toast.error("Failed to fetch users");
      setLoading(false);
    }
  };

  const updateStatus = async (uid, newStatus) => {
    try {
      const response = await axios.put(
        "/api/adminupdate",
        { uid, status: newStatus },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success("Status updated successfully");
      fetchUsers(); // Refresh the list
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update status");
    }
  };

  const deleteUser = async (uid) => {
    if (!window.confirm(`Are you sure you want to delete UID: ${uid}?`)) return;
    try {
      await axios.delete("/api/admindelete", {
        data: { uid },
        headers: { "Content-Type": "application/json" },
      });
      toast.success("User deleted successfully");
      fetchUsers();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete user");
    }
  };

  const toggleOnlineStatus = () => {
    const newStatus = !isOnline;
    setIsOnline(newStatus);
    localStorage.setItem("appStatus", newStatus ? "Editing" : "offline");
  };

  useEffect(() => {
    const syncStatus = () => {
      const status = localStorage.getItem("appStatus");
      setIsOnline(status === "Editing");
    };

    // Initial sync
    syncStatus();

    // Listen for changes in localStorage across tabs/windows
    window.addEventListener("storage", syncStatus);

    // Cleanup
    return () => window.removeEventListener("storage", syncStatus);
  }, []);

  return (
    <div className="w-full max-w-[600px] mx-auto p-4">
      <Toaster />
      {/* Online/Offline Toggle */}
      <div className="flex justify-end items-center gap-2 mb-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg mr-[155px]"
        >
          <FaArrowLeft className="text-sm" />
          <span>Back</span>
        </Link>
        <span
          className={`w-3 h-3 rounded-full animate-pulse ${
            isOnline ? "bg-green-500" : "bg-red-500"
          }`}
          title={isOnline ? "Editing" : "Offline"}
        />
        <button
          onClick={toggleOnlineStatus}
          className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded"
        >
          {isOnline ? "Go Offline" : "Go Online"}
        </button>
      </div>

      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid gap-4">
          {users.map((user) => (
            <div
              key={user.uid}
              className="border p-4 rounded-lg shadow flex justify-between items-center"
            >
              <div>
                <p className="text-lg font-semibold">UID: {user.uid}</p>
                <p className="text-sm">Current Status: {user.status}</p>
              </div>
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => updateStatus(user.uid, "completed")}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Complete
                </button>
                <button
                  onClick={() => updateStatus(user.uid, "pending")}
                  className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Pending
                </button>
                <button
                  onClick={() => updateStatus(user.uid, "invalid")}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Invalid
                </button>
                <button
                  onClick={() => deleteUser(user.uid)}
                  className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
