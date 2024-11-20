import { connectMongoDB } from "@/libs/mongodb";
import Car from "@/models/carSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import mongoose from "mongoose";

interface RouteParams {
    params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams ) {
    const { id } = await params;
    await connectMongoDB();
    const car = await Car.findOne({ _id: id });
    return NextResponse.json({ car }, { status: 200 });
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
    const { id } = await params;
    const { car_model: car_model, make: make, price: price, image: image, desc: desc } = await request.json();
    await connectMongoDB();
    await Car.findByIdAndUpdate(id, { car_model, make, price, image, desc});
    return NextResponse.json({ message: "Car updated" }, { status: 200 });
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json({ message: "Invalid ID format" }, { status: 400 });
    }

    await connectMongoDB();
    const deletedCar = await Car.findByIdAndDelete(id);

    if (!deletedCar) {
        return NextResponse.json({ message: "Car not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Car deleted" }, { status: 200 });
}