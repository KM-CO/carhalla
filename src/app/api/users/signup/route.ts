import { connectMongoDB } from "@/libs/mongodb";
import { User } from "@/models/userSchema";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

/** TO DO
 * figure out encryption
 * IDK, just make this not sketchy
 */
export async function POST(request: NextRequest) {
    // Handle POST requests
    const { username, email, password } = await request.json();
    await connectMongoDB();
    const hashedPassword = await bcrypt.hash(password, 5);
    const newUser = { username, email, password: hashedPassword };
    try {
    await User.create(newUser);
    } catch (error) {
        console.log("Failed to create user: ", error)
    }
    return NextResponse.json({ message: "User added successfully" }, { status: 201 });
}