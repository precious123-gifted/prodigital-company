

import mongoose from "mongoose";

const connection: { isConnected?:  number } = {};

export default async function dbConnect() {
  if (connection.isConnected)  {
    return;
  }

  try {
    const db = await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI!);
    connection.isConnected = db.connections[0].readyState;

   
    console.log("Connected to MongoDB successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error; 
  }
}

