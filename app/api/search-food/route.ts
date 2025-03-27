import { NextResponse } from "next/server";

const USDA_API_KEY = process.env.USDA_API_KEY;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json(
      { error: "Missing query parameter" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `https://api.nal.usda.gov/fdc/v1/foods/search?query=${encodeURIComponent(
        query
      )}&pageSize=5&api_key=${USDA_API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`USDA API responded with status: ${response.status}`);
    }

    const data = await response.json();

    const suggestions = data.foods.map((item: any) => {
      // Extract nutrients
      const nutrients: { [key: string]: number } = {};

      item.foodNutrients.forEach((n: any) => {
        if (n.nutrientName === "Energy") nutrients.calories = n.value;
        if (n.nutrientName === "Protein") nutrients.protein = n.value;
        if (n.nutrientName === "Carbohydrate, by difference")
          nutrients.carbs = n.value;
        if (n.nutrientName === "Total lipid (fat)") nutrients.fat = n.value;
      });

      return {
        id: item.fdcId,
        name: item.description,
        calories: nutrients.calories || 0,
        protein: nutrients.protein || 0,
        carbs: nutrients.carbs || 0,
        fat: nutrients.fat || 0,
      };
    });

    return NextResponse.json(suggestions);
  } catch (error) {
    console.error("USDA search error:", error);
    return NextResponse.json(
      { error: "Failed to fetch food data from USDA" },
      { status: 500 }
    );
  }
}
