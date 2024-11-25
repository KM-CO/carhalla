import connectMongoDB from "@/libs/mongodb";
import Car from "@/models/carSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import mongoose from "mongoose";

interface RouteParams {
    params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest) {

// Extract the 'id' from the request URL
const url = new URL(request.url);
const id = url.pathname.split("/").pop();

// Check if the ID is provided and valid
if (!id || !mongoose.Types.ObjectId.isValid(id)) {
  return NextResponse.json({ message: "Invalid ID format" }, { status: 400 });
}

await connectMongoDB();

try {
  const car = await Car.findOne({ _id: id });
  if (!car) {
    return NextResponse.json({ message: "Car not found" }, { status: 404 });
  }

  return NextResponse.json({ car }, { status: 200 });
} catch (error) {
  console.error("Error fetching car:", error);
  return NextResponse.json({ message: "Error fetching car" }, { status: 500 });
}
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
    const { id } = await params;
    const { car_model: car_model, make: make, year: year, price: price, img: img, desc: desc } = await request.json();
    await connectMongoDB();
    await Car.findByIdAndUpdate(id, { car_model, make, year, price, img, desc});
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