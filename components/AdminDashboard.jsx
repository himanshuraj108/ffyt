"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast, Toaster } from "sonner";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

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
      console.log('Updating status:', { uid, status: newStatus });
      const response = await axios.put("/api/adminupdate", 
        { uid, status: newStatus },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
      console.log('Update response:', response.data);
      toast.success("Status updated successfully");
      fetchUsers(); // Refresh the list
    } catch (error) {
      console.error('Update error:', error.response?.data || error);
      toast.error(error.response?.data?.message || "Failed to update status");
    }
  };

  const deleteUser = async (uid) => {
    if (!window.confirm(`Are you sure you want to delete UID: ${uid}?`)) {
      return;
    }
    
    try {
      await axios.delete("/api/admindelete", {
        data: { uid },
        headers: {
          'Content-Type': 'application/json',
        }
      });
      toast.success("User deleted successfully");
      fetchUsers(); // Refresh the list
    } catch (error) {
      console.error('Delete error:', error.response?.data || error);
      toast.error(error.response?.data?.message || "Failed to delete user");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Toaster />
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid gap-4">
          {users.map((user) => (
            <div key={user.uid} className="border p-4 rounded-lg shadow flex justify-between items-center">
              <div>
                <p className="text-lg font-semibold">UID: {user.uid}</p>
                <p className="text-sm">Current Status: {user.status}</p>
              </div>
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => updateStatus(user.uid, 'completed')}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                >
                  Complete
                </button>
                <button
                  onClick={() => updateStatus(user.uid, 'pending')}
                  className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
                >
                  Pending
                </button>
                <button
                  onClick={() => updateStatus(user.uid, 'invalid')}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                  Invalid
                </button>
                <button
                  onClick={() => deleteUser(user.uid)}
                  className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900 transition-colors"
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
}

export default AdminDashboard;