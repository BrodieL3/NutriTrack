import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, calories, protein, carbs, fat, userId } =
      await request.json();

    if (!name || !calories || !protein || !carbs || !fat || !userId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const meal = await prisma.meal.create({
      data: {
        name,
        calories: Number(calories),
        protein: Number(protein),
        carbs: Number(carbs),
        fat: Number(fat),
        userId,
      },
    });

    return NextResponse.json(meal, { status: 201 });
  } catch (error) {
    console.error("Error saving meal:", error);
    return NextResponse.json({ error: "Error saving meal" }, { status: 500 });
  }
}

export async function GET() {
  try {
    // In a real app, you would filter by userId from session
    const meals = await prisma.meal.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(meals);
  } catch (error) {
    console.error("Error fetching meals:", error);
    return NextResponse.json(
      { error: "Error fetching meals" },
      { status: 500 }
    );
  }
}
