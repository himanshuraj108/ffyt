"use client";
import React, { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import Link from "next/link";
import { FaArrowLeft, FaSearch } from "react-icons/fa";

const Status = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isOnline, setIsOnline] = useState(true);
  const [stats, setStats] = useState({
    pending: 0,
    completed: 0,
    invalid: 0,
    deleted: 0,
    total: 0,
  });

  // Sync status from localStorage
  useEffect(() => {
    const status = localStorage.getItem("appStatus");
    setIsOnline(status === "Editing");
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/status");
        const data = await response.json();
        if (response.ok) {
          setUsers(data.users);
          setFilteredUsers(data.users);
          setStats(data.stats);
        } else {
          toast.error("Failed to fetch users");
        }
      } catch (error) {
        toast.error("Error fetching users");
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter((user) =>
        user.uid.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [searchQuery, users]);

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "text-green-600";
      case "invalid":
        return "text-red-600";
      case "pending":
      default:
        return "text-yellow-600";
    }
  };

  const StatText = ({ label, count, textColorClass }) => (
    <div className="text-sm">
      <span className={textColorClass}>{count}</span>
      <span className="text-gray-600 ml-1">{label}</span>
    </div>
  );

  return (
    <div className="container mx-auto p-4">
      <Toaster />
      {/* Online/Offline Indicator */}
      <div className="flex justify-end items-center gap-2 mb-2">
        <span
          className={`w-3 h-3 rounded-full animate-pulse ${
            isOnline ? "bg-green-500" : "bg-red-500"
          }`}
          title={isOnline ? "Editing" : "Offline"}
        />
        <span className="text-sm text-gray-600">
          {isOnline ? "Editing" : "Offline"}
        </span>
      </div>

      <div className="flex items-center mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg mr-4"
        >
          <FaArrowLeft className="text-sm" />
          <span>Back</span>
        </Link>
        <h1 className="text-2xl font-bold">Check Your Status</h1>
      </div>

      <div className="flex flex-col space-y-6">
        {/* Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="number"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="Search by UID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
        </div>

        {/* Statistics */}
        <div className="flex flex-wrap gap-1 text-sm">
          <StatText
            label="Pending"
            count={stats.pending}
            textColorClass="text-yellow-500 font-bold"
          />
          <span className="text-gray-300">•</span>
          <StatText
            label="Completed"
            count={stats.completed}
            textColorClass="text-green-500 font-bold"
          />
          <span className="text-gray-300">•</span>
          <StatText
            label="Invalid"
            count={stats.invalid}
            textColorClass="text-red-500 font-bold"
          />
          <span className="text-gray-300">•</span>
          <StatText
            label="Total UID"
            count={stats.total}
            textColorClass="text-blue-500 font-bold"
          />
        </div>
      </div>

      <div className="grid gap-4 mt-6">
        {filteredUsers.map((user) => (
          <div
            key={user.uid}
            className="border p-4 rounded-lg shadow flex justify-between items-start"
          >
            <div>
              <p className="text-lg font-semibold">UID: {user.uid}</p>
              <p
                className={`text-sm mt-2 font-medium ${getStatusColor(
                  user.status
                )}`}
              >
                Status:{" "}
                {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
              </p>
              <p className="text-xs text-gray-600 mt-1">
                Added:{" "}
                {new Date(user.createdAt).toLocaleString("en-IN", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                  timeZone: "Asia/Kolkata",
                })}
              </p>
            </div>
            <div
              className={`px-3 py-1 rounded-full ${getStatusColor(
                user.status
              )} bg-opacity-20`}
            >
              <p className="text-sm font-semibold">Queue #{user.queueNumber}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Status;
