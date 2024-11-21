import { connectMongoDB } from "@/libs/mongodb";
import { User } from "@/models/userSchema";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
    try {
        const { username, email, password } = await request.json();

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 5);

        // Connect to MongoDB
        await connectMongoDB();

        // Check if the email already exists
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return NextResponse.json({ message: "Email is already in use!" }, { status: 409 });
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return NextResponse.json({ message: "Username is already in use!" }, { status: 409 });
        }

        // Create the new user
        const newUser = { username, email, password: hashedPassword };
        await User.create(newUser);

        return NextResponse.json({ message: "User added successfully" }, { status: 201 });
    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json(
            { message: "An error occurred while creating the user. Please try again later." },
            { status: 500 }
        );
    }
}