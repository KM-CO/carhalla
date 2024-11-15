
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Please add your Mongo URI to .env.local");
}


declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default clientPromise;
import mongoose from "mongoose";


export const connectMongoDB = async (): Promise<void> => {
 try {
   const uri = process.env.MONGODB_URI;
   if (!uri) {
     throw new Error("MONGODB_URI is not defined in environment variables.");
   }


   await mongoose.connect(uri);
   console.log("Connected to MongoDB.");
 } catch (error) {
   console.log("Error connecting to MongoDB:", (error as Error).message);
 }
};
