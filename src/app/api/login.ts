import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import connectMongoDB from "../../libs/mongodb"; 


const getUserByUsername = async (username: string) => {
  const client = await connectMongoDB;
  const db = client.db("yourDatabaseName"); 
  return db.collection("users").findOne({ username });
};

export default async function loginHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { username, password } = req.body;

    try {
      
      const user = await getUserByUsername(username);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Validate the password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password" });
      }

      res.status(200).json({ message: "Login successful", userId: user._id });
    } catch (error) {
      res.status(500).json({ message: "Error logging in", error: (error as Error).message });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
