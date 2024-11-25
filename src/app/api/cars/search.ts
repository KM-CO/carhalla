import connectMongoDB from "@/libs/mongodb";
import Car from "@/models/carSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const make = url.searchParams.get("make");
  const model = url.searchParams.get("model");
  const year = url.searchParams.get("year");
  const price = url.searchParams.get("price");

  await connectMongoDB();

  let query = {};

  if (make) {
    query = { ...query, make: { $regex: make, $options: "i" } };
  }
  if (model) {
    query = { ...query, car_model: { $regex: model, $options: "i" } };
  }
  if (year) {
    query = { ...query, year: { $regex: year, $options: "i" } };
  }
  if (price) {
    query = { ...query, price: { $regex: price, $options: "i" } };
  }

  try {
    const cars = await Car.find(query);
    return NextResponse.json({ cars }, { status: 200 });
  } catch (error) {
    console.error("Error fetching cars:", error);
    return NextResponse.json({ message: "Error fetching cars" }, { status: 500 });
  }
}
