import clientPromise, { connectMongoDB } from "@/libs/mongodb";
import Car from "@/models/carSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  // Await connection to MongoDB
  const client = await clientPromise;
  const db = client.db("carhalla");

  // Extract query parameters from the request URL
  const { searchParams } = new URL(request.url);
  const model = searchParams.get("model");
  const year = searchParams.get("year");
  const priceRange = searchParams.get("priceRange");

  // Construct a query object with appropriate types
  const query: Record<string, unknown> = {};
  if (model) query.make = model;
  if (year) query.year = year;

  if (priceRange) {
    const priceConditions: Record<
      string,
      { $lt?: number; $gte?: number; $lte?: number; $gt?: number }
    > = {
      "Under $30,000": { $lt: 30000 },
      "$30,000 - $50,000": { $gte: 30000, $lte: 50000 },
      "$50,000 - $70,000": { $gte: 50000, $lte: 70000 },
      "Above $70,000": { $gt: 70000 },
    };

    if (priceConditions[priceRange]) {
      query.price = priceConditions[priceRange];
    }
  }

  // Fetch filtered cars from the database
  const cars = await db.collection("cars").find(query).toArray();

  // Return the results
  return NextResponse.json({ cars });
}

export async function POST(request: NextRequest) {
  // Handle POST requests
  const { car_model, make, price, img, desc } = await request.json();
  await connectMongoDB();
  await Car.create({ car_model, make, price, img, desc });
  return NextResponse.json({ message: "Car added successfully" }, { status: 201 });
}
