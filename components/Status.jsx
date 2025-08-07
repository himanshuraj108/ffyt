"use client";
import React, { useEffect, useState, useRef } from "react";
import { Toaster, toast } from "sonner";
import Link from "next/link";
import { FaArrowLeft, FaSearch } from "react-icons/fa";

const Status = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isOnline, setIsOnline] = useState(true);
  const [highlightUid, setHighlightUid] = useState(null);
  const [stats, setStats] = useState({
    pending: 0,
    completed: 0,
    invalid: 0,
    deleted: 0,
    total: 0,
  });

  const cardRef = useRef(null);

  useEffect(() => {
    const status = localStorage.getItem("appStatus");
    setIsOnline(status === "Editing");

    const uidFromStorage = localStorage.getItem("currentUserUid");
    if (uidFromStorage) {
      setHighlightUid(uidFromStorage);
    }
  }, []);

  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [highlightUid]);

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

  // ✅ Rolling Upload Logic
  const pendingQueue = filteredUsers
    .filter((user) => user.status === "pending")
    .sort((a, b) => a.queueNumber - b.queueNumber);

  const completedToday = filteredUsers
    .filter((user) => user.status === "completed")
    .sort((a, b) => a.queueNumber - b.queueNumber)
    .slice(0, 6);

  const showTomorrowBatch = completedToday.length >= 6;

  const currentBatch = showTomorrowBatch
    ? pendingQueue.slice(6, 12)
    : pendingQueue.slice(0, 6);

  const uploadDateLabel = showTomorrowBatch ? "Tomorrow" : "Today";
  const batchColor = showTomorrowBatch ? "text-red-700" : "text-green-700";
  const cardBg = showTomorrowBatch ? "bg-red-50" : "bg-green-50";

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

      {/* ✅ Dynamic Upload Batch */}
      {currentBatch.length > 0 && (
        <div className="mt-6">
          <h2 className={`text-lg font-bold mb-2 ${batchColor}`}>
            {uploadDateLabel} Uploads
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {currentBatch.map((user, index) => (
              <div
                key={user.uid}
                className={`px-3 py-2 border rounded-md shadow text-sm text-gray-800 ${cardBg}`}
              >
                <p className="text-xs text-gray-500 font-bold">{index + 1}</p>
                <p className="font-semibold">UID: {user.uid}</p>
                <p className="text-xs text-gray-600">
                  Queue #{user.queueNumber}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ✅ Full User Cards */}
      <div className="grid gap-4 mt-6">
        {filteredUsers.map((user, index) => {
          const isHighlighted = user.uid === highlightUid;
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
                {isHighlighted && (
                  <span className="inline-block mt-2 text-xs text-blue-600 font-medium bg-blue-100 px-2 py-0.5 rounded">
                    Your UID
                  </span>
                )}
              </div>
              <div
                className={`px-3 py-1 rounded-full ${getStatusColor(
                  user.status
                )} bg-opacity-20`}
              >
                <p className="text-sm font-semibold">
                  Queue #{user.queueNumber}
                </p>
                <p
                  className={`text-xs text-gray-600 mt-4 font-medium ${
                    user.status === "pending" &&
                    user.queueNumber <= 12 &&
                    completedToday.length >= 6
                      ? "animate-bounce"
                      : user.status === "pending" &&
                        user.queueNumber <= 6 &&
                        completedToday.length < 6
                      ? "animate-bounce"
                      : ""
                  }`}
                >
                  Upload Date:{" "}
                  <span
                    className={`inline-block font-semibold ${
                      user.status === "invalid"
                        ? "text-red-600"
                        : user.status === "pending"
                        ? completedToday.length >= 6
                          ? user.queueNumber <= 6
                            ? "text-green-600"
                            : user.queueNumber <= 12
                            ? "text-red-600"
                            : "text-yellow-600"
                          : user.queueNumber <= 6
                          ? "text-green-600"
                          : "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {user.status === "invalid"
                      ? "None"
                      : user.status === "pending"
                      ? completedToday.length >= 6
                        ? user.queueNumber <= 6
                          ? "Completed"
                          : user.queueNumber <= 12
                          ? "Tomorrow"
                          : new Date(
                              new Date().setDate(
                                new Date().getDate() +
                                  Math.floor((user.queueNumber - 1) / 6)
                              )
                            ).toLocaleDateString("en-IN", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })
                        : user.queueNumber <= 6
                        ? "Today"
                        : new Date(
                            new Date().setDate(
                              new Date().getDate() +
                                Math.floor((user.queueNumber - 1) / 6)
                            )
                          ).toLocaleDateString("en-IN", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })
                      : new Date(
                          new Date(user.createdAt).setDate(
                            new Date(user.createdAt).getDate() +
                              Math.floor((user.queueNumber - 1) / 6)
                          )
                        ).toLocaleDateString("en-IN", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                  </span>
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
