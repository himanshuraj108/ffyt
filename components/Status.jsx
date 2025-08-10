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

  // ✅ Logic for Today Uploads (exactly 6 valid UIDs)
  const sortedPending = filteredUsers
    .filter((user) => user.status === "pending")
    .sort((a, b) => a.queueNumber - b.queueNumber);

  const sortedCompleted = filteredUsers
    .filter((user) => user.status === "completed")
    .sort((a, b) => a.queueNumber - b.queueNumber);

  const pendingUsers = filteredUsers
  .filter((user) => user.status === "pending")
  .sort((a, b) => a.queueNumber - b.queueNumber);

const todayUploads = pendingUsers.slice(0, 6);
const tomorrowUploads = todayUploads.length === 6 ? pendingUsers.slice(0, 6) : [];

  return (
    <div className="min-w-[450px] w-[450px] max-w-full mx-auto min-h-screen px-4 py-4">
      <Toaster />

      {/* Online/Offline Indicator */}
      <div className="flex justify-end items-center gap-2 mb-2">
        <span
          className={`w-3 h-3 rounded-full animate-pulse ${
            isOnline ? "bg-green-500" : "bg-red-500"
          }`}
          title={isOnline ? "Editing" : "Offline"}
        />
        <span className="text-sm text-gray-600 animate-pulse">
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
        <h1 className="text-xl font-bold">Check Your Status</h1>
      </div>

      <div className="text-center mt-4">
        <p className="text-lg text-blue-600 font-semibold animate-bounce">
          Only 6 UID's will be upload daily!
        </p>
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

      {todayUploads.length >= 6 ? (
  tomorrowUploads.length > 0 && (
    <div className="mt-6">
      <h2 className="text-lg font-bold mb-2 text-red-700">Tomorrow Uploads</h2>
      <div className="grid grid-cols-2 gap-2">
        {tomorrowUploads.map((user, index) => (
          <div
            key={user.uid}
            className="px-3 py-2 border rounded-md shadow text-sm text-gray-800 bg-red-50"
          >
            <p className="text-xs text-gray-500 font-bold">{index + 1}</p>
            <p className="font-semibold">UID: {user.uid}</p>
            <p className="text-xs text-gray-600">Queue #{user.queueNumber}</p>
          </div>
        ))}
      </div>
    </div>
  )
) : (
  todayUploads.length > 0 && (
    <div className="mt-6">
      <h2 className="text-lg font-bold mb-2 text-green-700">Today Uploads</h2>
      <div className="grid grid-cols-2 gap-2">
        {todayUploads.map((user, index) => (
          <div
            key={user.uid}
            className="px-3 py-2 border rounded-md shadow text-sm text-gray-800 bg-green-50"
          >
            <p className="text-xs text-gray-500 font-bold">{index + 1}</p>
            <p className="font-semibold">UID: {user.uid}</p>
            <p className="text-xs text-gray-600">Queue #{user.queueNumber}</p>
          </div>
        ))}
      </div>
    </div>
  )
)}

     {/* ✅ Full User Cards with Dynamic Upload Date and Color */}
<div className="grid gap-4 mt-6">
  {filteredUsers.map((user, index) => {
    const isHighlighted = user.uid === highlightUid;

    // Virtual batching
    const pendingSorted = filteredUsers
      .filter((u) => u.status === "pending")
      .sort((a, b) => a.queueNumber - b.queueNumber);

    const completedSorted = filteredUsers
      .filter((u) => u.status === "completed")
      .sort((a, b) => a.queueNumber - b.queueNumber);

    const completedToday = completedSorted.slice(0, 6);
    const showTomorrow = completedToday.length === 6;

    const allSorted = [...completedToday, ...pendingSorted];
    const virtualIndex = allSorted.findIndex((u) => u.uid === user.uid);
    const batchIndex = virtualIndex >= 0 ? Math.floor(virtualIndex / 6) : null;
    const virtualQueue = virtualIndex >= 0 ? (virtualIndex % 6) + 1 : user.queueNumber;

    // Upload label and color
    let label = "None";
    let color = "text-gray-500";
    let animate = "";

    if (user.status === "invalid") {
      label = "None";
      color = "text-red-600";
    } else if (user.status === "completed" && batchIndex === 0 && showTomorrow) {
      label = "Tomorrow";
      color = "text-amber-700"; // brown tone
    } else if (user.status === "pending" && batchIndex === 1 && showTomorrow) {
      label = "Today";
      color = "text-green-600";
      animate = "animate-bounce";
    } else if (user.status === "pending" && batchIndex === 0 && !showTomorrow) {
      label = "Today";
      color = "text-green-600";
      animate = "animate-bounce";
    } else if (batchIndex !== null) {
      const date = new Date();
      date.setDate(date.getDate() + batchIndex);
      label = date.toLocaleDateString("en-IN", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
      color = "text-red-600";
    }

    return (
      <div
        key={user.uid}
        ref={isHighlighted ? cardRef : null}
        className={`border p-4 rounded-lg shadow flex justify-between items-start transition-all duration-300 ${
          isHighlighted
            ? "border-blue-500 bg-blue-100 ring-2 ring-blue-400 scale-[1.02] animate-pulse"
            : ""
        }`}
      >
        <div>
          <p className="text-sm text-gray-500 font-bold">{index + 1}</p>
          <p className="text-lg font-semibold">UID: {user.uid}</p>
          <p className={`text-sm mt-2 font-medium ${getStatusColor(user.status)}`}>
            Status: {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
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
        <div className={`px-3 py-1 rounded-full ${getStatusColor(user.status)} bg-opacity-20`}>
          <p className="text-sm font-semibold">Queue #{virtualQueue}</p>
          <p className={`text-xs mt-4 font-medium ${animate} text-gray-600`}>
            Upload Date: <span className={`inline-block font-semibold ${color}`}>{label}</span>
          </p>
        </div>
      </div>
    );
  })}
</div>
    </div>
  );
};

export default Status;
