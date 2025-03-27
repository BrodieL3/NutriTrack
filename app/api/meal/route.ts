import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

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
        protein: new Prisma.Decimal(protein),
        carbs: new Prisma.Decimal(carbs),
        fat: new Prisma.Decimal(fat),
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

    // Convert Decimal objects to numbers for JSON response
    const formattedMeals = meals.map((meal) => ({
      ...meal,
      protein: parseFloat(meal.protein.toString()),
      carbs: parseFloat(meal.carbs.toString()),
      fat: parseFloat(meal.fat.toString()),
    }));

    return NextResponse.json(formattedMeals);
  } catch (error) {
    console.error("Error fetching meals:", error);
    return NextResponse.json(
      { error: "Error fetching meals" },
      { status: 500 }
    );
  }
}
