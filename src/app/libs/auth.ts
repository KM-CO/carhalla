// auth.ts
import connectMongoDB from "./mongodb"; 

export const insertUser = async (userData: { username: string; email: string; password: string }) => {
  const client = await connectMongoDB; 
  const db = client.db("yourDatabaseName"); 

  const result = await db.collection("users").insertOne(userData);
  return result;
};

export const getUserByUsername = async (username: string) => {
  const client = await connectMongoDB; 
  const db = client.db("yourDatabaseName"); 

  return db.collection("users").findOne({ username });
};
