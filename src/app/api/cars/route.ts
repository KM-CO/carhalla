import connectMongoDB from "../../libs/mongodb";
import Car from "../../models/carSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET() {
    // Handle GET requests
    await connectMongoDB();
    const cars = await Car.find();
    return NextResponse.json({ cars });
}

export async function POST(request: NextRequest) {
    // Handle POST requests
    const { car_model, make, price, image, desc } = await request.json();
    await connectMongoDB();
    await Car.create({ car_model, make, price, image, desc });
    return NextResponse.json({ message: "Car added successfully" }, { status: 201 });
}
