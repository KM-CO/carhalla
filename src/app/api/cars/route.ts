import connectMongoDB from "@/libs/mongodb";
import Car from "@/models/carSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    
    await connectMongoDB();

    const { searchParams } = new URL(request.url);
    const filterOptions = searchParams.get("filterOptions");
    const make = searchParams.get("make");
    const model = searchParams.get("model");
    const year = searchParams.get("year");
    const priceRange = searchParams.get("priceRange");

   
    if (filterOptions) {
      const query: Record<string, unknown> = {};
      if (make) query.make = make;
      if (model) query.car_model = model;
      if (year) query.year = year;

      const makes = await Car.distinct("make", query);
      const models = await Car.distinct("car_model", query);
      const years = await Car.distinct("year", query);

      return NextResponse.json({ makes, models, years });
    }

    
    const query: Record<string, unknown> = {};
    if (make) query.make = make;
    if (model) query.car_model = model;
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

    console.log("Query:", query); 

    
    const cars = await Car.find(query);

    return NextResponse.json({ cars });
  } catch (error) {
    console.error("Error fetching cars:", error);
    return NextResponse.json({ error: "Failed to fetch cars" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    
    const { car_model, make, year, price, img, desc, owner, ownerEmail } = await request.json();

    console.log('Received data:', { car_model, make, year, price, img, desc, owner, ownerEmail });

    
    await connectMongoDB();

    
    const car = await Car.create({ car_model, make, year, price, img, desc, owner, ownerEmail });
    console.log('Inserted car:', car.toObject());
    
    return NextResponse.json({ message: "Car added successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error adding car:", error);
    return NextResponse.json({ error: "Failed to add car" }, { status: 500 });
  }
}