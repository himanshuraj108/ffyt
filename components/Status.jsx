'use client'
import React, { useEffect, useState } from 'react'
import { Toaster, toast } from "sonner"
import Link from 'next/link'
import { FaArrowLeft } from 'react-icons/fa'

const Status = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/status')
        const data = await response.json()
        if (response.ok) {
          setUsers(data.users)
        } else {
          toast.error('Failed to fetch users')
        }
      } catch (error) {
        toast.error('Error fetching users')
      }
    }
    fetchUsers()
  }, [])

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-600';
      case 'invalid':
        return 'text-red-600';
      case 'pending':
      default:
        return 'text-yellow-600';
    }
  }

  return (
    <div className="container mx-auto p-4">
      <Toaster />
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
      <div className="grid gap-4">
        {users.map((user) => (
          <div key={user.uid} className="border p-4 rounded-lg shadow">
            <p className="text-lg font-semibold">UID: {user.uid}</p>
            <p className={`text-sm mt-2 font-medium ${getStatusColor(user.status)}`}>
              Status: {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
            </p>
            <p className="text-xs text-gray-600 mt-1">
              Added: {new Date(user.createdAt).toLocaleString('en-IN', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
                timeZone: 'Asia/Kolkata'
              })}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Status