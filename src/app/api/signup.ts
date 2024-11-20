import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import connectMongoDB from '../../libs/mongodb'; 

export default async function signupHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, email, password } = req.body;

    try {
  
      const hashedPassword = await bcrypt.hash(password, 10);


      const newUser = { username, email, password: hashedPassword };

      
      const client = await connectMongoDB;
      const db = client.db("yourDatabaseName"); 

      
      await db.collection("users").insertOne(newUser);

      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error registering user', error: (error as Error).message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
