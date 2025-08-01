import { NextResponse } from "next/server";
import dbConnect from "@/config/db";
import User from "@/models/user.schema";

export async function GET(req) {
  try {
    await dbConnect();
    const users = await User.find({})
      .select('uid status createdAt -_id')
      .sort({ createdAt: -1 }) // Sort by creation date descending (newest first)
      .lean()
      .exec();
    
    // Get total counts for each status to assign reverse queue numbers
    const totalCounts = {
      pending: users.filter(user => user.status === 'pending').length,
      completed: users.filter(user => user.status === 'completed').length,
      invalid: users.filter(user => user.status === 'invalid').length,
      deleted: users.filter(user => user.status === 'deleted').length
    };
    
    // Initialize counters for queue numbers starting from total counts
    let queueCounters = { ...totalCounts };
    
    // Format the users and add queue numbers (counting down from total)
    const formattedUsers = users.map(user => {
      // Decrement the counter for this status
      const currentQueueNumber = queueCounters[user.status];
      queueCounters[user.status] = currentQueueNumber - 1;
      
      return {
        ...user,
        queueNumber: currentQueueNumber,
        createdAt: user.createdAt ? new Date(user.createdAt).toISOString() : new Date().toISOString()
      };
    });

    // Calculate statistics
    const stats = {
      pending: users.filter(user => user.status === 'pending').length,
      completed: users.filter(user => user.status === 'completed').length,
      invalid: users.filter(user => user.status === 'invalid').length,
      deleted: users.filter(user => user.status === 'deleted').length,
      total: users.length
    };

    return NextResponse.json({ 
      users: formattedUsers,
      stats: stats 
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Status API ERROR", error: error.message },
      { status: 500 }
    );
  }
}
