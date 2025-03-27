"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FoodAutocomplete } from "@/components/food-autocomplete";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FoodItem {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export function LogMealForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    mealType: "",
    calories: "",
    protein: "",
    carbs: "",
    fat: "",
  });
  const [macroMismatch, setMacroMismatch] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, mealType: value }));
  };

  // Validate macros when any value changes
  useEffect(() => {
    if (
      formData.calories &&
      formData.protein &&
      formData.carbs &&
      formData.fat
    ) {
      const calories = parseFloat(formData.calories);
      const protein = parseFloat(formData.protein);
      const carbs = parseFloat(formData.carbs);
      const fat = parseFloat(formData.fat);

      // Calculate estimated calories from macronutrients
      const estimatedCalories = Math.round(protein * 4 + carbs * 4 + fat * 9);
      const discrepancy = Math.abs(estimatedCalories - calories);

      // Show warning if discrepancy is more than 20 calories
      setMacroMismatch(discrepancy > 20);
    }
  }, [formData.calories, formData.protein, formData.carbs, formData.fat]);

  const handleSelectFood = (food: FoodItem) => {
    setFormData({
      ...formData,
      name: food.name,
      calories: food.calories.toFixed(0),
      protein: food.protein.toFixed(1),
      carbs: food.carbs.toFixed(1),
      fat: food.fat.toFixed(1),
    });

    // Calculate macro mismatch
    const estimatedCalories = Math.round(
      food.protein * 4 + food.carbs * 4 + food.fat * 9
    );
    const discrepancy = Math.abs(estimatedCalories - food.calories);
    setMacroMismatch(discrepancy > 20);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/meal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          calories: parseInt(formData.calories),
          protein: parseFloat(formData.protein),
          carbs: parseFloat(formData.carbs),
          fat: parseFloat(formData.fat),
          userId: "temp-user", // TODO: hook up real auth
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save meal");
      }

      setSubmitted(true);

      // Reset form after a delay
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: "",
          mealType: "",
          calories: "",
          protein: "",
          carbs: "",
          fat: "",
        });
        router.refresh(); // Refresh data on dashboard
      }, 2000);
    } catch (error) {
      console.error("Error saving meal:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold tracking-tight mb-6">Log Food</h1>

      <Card>
        <CardHeader>
          <CardTitle>Add Food Entry</CardTitle>
          <CardDescription>
            Enter the details of your meal to track your nutrition.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-6">
              <CheckCircle2 className="h-12 w-12 text-green-500 mb-2" />
              <h3 className="text-xl font-medium">Food Logged Successfully!</h3>
              <p className="text-muted-foreground text-center mt-1">
                Your nutrition data has been updated.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <FoodAutocomplete onSelectFood={handleSelectFood} />

              <div className="space-y-2">
                <Label htmlFor="name">Meal Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  placeholder="e.g., Chicken Salad"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mealType">Meal Type</Label>
                <Select
                  value={formData.mealType}
                  onValueChange={handleSelectChange}
                >
                  <SelectTrigger id="mealType">
                    <SelectValue placeholder="Select meal type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="breakfast">Breakfast</SelectItem>
                    <SelectItem value="lunch">Lunch</SelectItem>
                    <SelectItem value="dinner">Dinner</SelectItem>
                    <SelectItem value="snack">Snack</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="calories">Calories (kcal)</Label>
                <Input
                  id="calories"
                  name="calories"
                  type="number"
                  placeholder="e.g., 350"
                  value={formData.calories}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="protein">Protein (g)</Label>
                  <Input
                    id="protein"
                    name="protein"
                    type="number"
                    step="0.1"
                    placeholder="e.g., 25"
                    value={formData.protein}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="carbs">Carbs (g)</Label>
                  <Input
                    id="carbs"
                    name="carbs"
                    type="number"
                    step="0.1"
                    placeholder="e.g., 30"
                    value={formData.carbs}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fat">Fat (g)</Label>
                  <Input
                    id="fat"
                    name="fat"
                    type="number"
                    step="0.1"
                    placeholder="e.g., 12"
                    value={formData.fat}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {macroMismatch && (
                <div className="flex items-center gap-2 text-yellow-600 bg-yellow-50 p-2 rounded">
                  <AlertTriangle className="h-4 w-4" />
                  <p className="text-sm">
                    Calorie total may not match macronutrient estimate. Please
                    double-check.
                  </p>
                </div>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Saving..." : "Log Food"}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
