import { connectMongoDB } from "@/libs/mongodb";
import Car from "@/models/carSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Establish a connection to MongoDB
    await connectMongoDB();

    const { searchParams } = new URL(request.url);
    const make = searchParams.get("make");
    const model = searchParams.get("model");
    const year = searchParams.get("year");
    const priceRange = searchParams.get("priceRange");

    const query: Record<string, unknown> = {};
    if (make) query.make = make; // Filters by make
    if (model) query.car_model = model; // Filters by model
    if (year) query.year = year;

    if (priceRange) {
      const priceConditions: Record<string, { $lt?: number; $gte?: number; $lte?: number; $gt?: number }> = {
        "Under $30,000": { $lt: 30000 },
        "$30,000 - $50,000": { $gte: 30000, $lte: 50000 },
        "$50,000 - $70,000": { $gte: 50000, $lte: 70000 },
        "Above $70,000": { $gt: 70000 },
      };

      if (priceConditions[priceRange]) {
        query.price = priceConditions[priceRange];
      }
    }

    console.log("Query:", query); // Debug the query

    // Use the Car model to fetch data
    const cars = await Car.find(query);

    return NextResponse.json({ cars });
  } catch (error) {
    console.error("Error fetching cars:", error);
    return NextResponse.json({ error: "Failed to fetch cars" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  // Handle POST requests
  const { car_model, make, price, img, desc } = await request.json();
  await connectMongoDB();
  await Car.create({ car_model, make, price, img, desc });
  return NextResponse.json({ message: "Car added successfully" }, { status: 201 });
}