import { connectMongoDB } from "../../libs/mongodb";
import User from "../../models/userSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

/** TO DO
 * Make this secure? Maybe can't request users directly
 * really just ask PLAs about this or Dr. Stephens
 */
export async function GET() {
    // Handle GET requests
    await connectMongoDB();
    const users = await User.find();
    return NextResponse.json({ users });
}

/** TO DO
 * figure out encryption
 * IDK, just make this not sketchy
 */
export async function POST(request: NextRequest) {
    // Handle POST requests
    const { username } = await request.json();
    await connectMongoDB();
    await User.create({ username });
    return NextResponse.json({ message: "User added successfully" }, { status: 201 });
}
