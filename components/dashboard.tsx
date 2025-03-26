"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  UtensilsCrossed,
  Weight,
  Footprints,
  Moon,
  ArrowRight,
} from "lucide-react";
import { MacroChart } from "@/components/macro-chart";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Meal = {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  createdAt: string;
};

export function Dashboard() {
  const router = useRouter();
  const [meals, setMeals] = useState<Meal[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchMeals() {
      try {
        const response = await fetch("/api/meal");
        if (!response.ok) {
          throw new Error("Failed to fetch meals");
        }
        const data = await response.json();
        setMeals(data);
      } catch (error) {
        console.error("Error fetching meals:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMeals();
  }, []);

  // Calculate nutrition totals
  const totals = {
    calories: meals.reduce((sum, meal) => sum + meal.calories, 0),
    protein: meals.reduce((sum, meal) => sum + meal.protein, 0),
    carbs: meals.reduce((sum, meal) => sum + meal.carbs, 0),
    fat: meals.reduce((sum, meal) => sum + meal.fat, 0),
  };

  // Get today's date
  const today = new Date();
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  const formattedDate = today.toLocaleDateString("en-US", options);

  // Calculate calorie goal and percentage
  const calorieGoal = 2000;
  const caloriesRemaining = Math.max(0, calorieGoal - totals.calories);
  const caloriePercentage = Math.min(
    100,
    (totals.calories / calorieGoal) * 100
  );

  const navigateToLogMeal = () => {
    router.push("/log");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">
          Daily Nutrition Summary
        </h1>
        <div className="text-sm text-muted-foreground">{formattedDate}</div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Calories</CardTitle>
            <CardDescription>Daily Goal: {calorieGoal} kcal</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totals.calories}</div>
            <div className="mt-1 h-2 w-full rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary"
                style={{ width: `${caloriePercentage}%` }}
              ></div>
            </div>
            <div className="mt-1 text-xs text-muted-foreground">
              {caloriesRemaining} kcal remaining
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Macronutrients</CardTitle>
            <CardDescription>
              Protein: {totals.protein}g, Carbs: {totals.carbs}g, Fat:{" "}
              {totals.fat}g
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="h-[150px]">
              <MacroChart
                protein={totals.protein}
                carbs={totals.carbs}
                fat={totals.fat}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Quick Actions</CardTitle>
            <CardDescription>Log your progress</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2">
            <Button
              className="w-full justify-between"
              variant="outline"
              onClick={navigateToLogMeal}
            >
              <div className="flex items-center">
                <UtensilsCrossed className="mr-2 h-4 w-4" />
                Log Food
              </div>
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button className="w-full justify-between" variant="outline">
              <div className="flex items-center">
                <Weight className="mr-2 h-4 w-4" />
                Weigh In
              </div>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-xl font-semibold mt-6">Activity Summary</h2>
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center">
              <Footprints className="mr-2 h-4 w-4" />
              Steps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7,842</div>
            <div className="text-xs text-muted-foreground">Goal: 10,000</div>
            <div className="mt-1 h-2 w-full rounded-full bg-muted">
              <div className="h-full w-[78%] rounded-full bg-green-500"></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center">
              <Moon className="mr-2 h-4 w-4" />
              Sleep
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7.5 hrs</div>
            <div className="text-xs text-muted-foreground">Goal: 8 hours</div>
            <div className="mt-1 h-2 w-full rounded-full bg-muted">
              <div className="h-full w-[94%] rounded-full bg-blue-500"></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center">
              <Weight className="mr-2 h-4 w-4" />
              Current Weight
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">165 lbs</div>
            <div className="text-xs text-muted-foreground">Goal: 160 lbs</div>
            <div className="flex items-center text-xs text-green-500 mt-1">
              <span>↓ 0.5 lbs from last week</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {meals.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mt-6">Today's Meals</h2>
          <div className="grid gap-4 mt-2">
            {meals.map((meal) => (
              <Card key={meal.id}>
                <CardHeader className="pb-2 pt-4">
                  <CardTitle className="text-base">{meal.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-2 text-sm">
                    <div>
                      <div className="font-semibold">{meal.calories}</div>
                      <div className="text-xs text-muted-foreground">
                        Calories
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold">{meal.protein}g</div>
                      <div className="text-xs text-muted-foreground">
                        Protein
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold">{meal.carbs}g</div>
                      <div className="text-xs text-muted-foreground">Carbs</div>
                    </div>
                    <div>
                      <div className="font-semibold">{meal.fat}g</div>
                      <div className="text-xs text-muted-foreground">Fat</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
