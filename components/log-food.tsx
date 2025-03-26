"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle2 } from "lucide-react"

export function LogFood() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    mealName: "",
    mealType: "",
    calories: "",
    protein: "",
    carbs: "",
    fat: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, mealType: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would normally save the data
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({
        mealName: "",
        mealType: "",
        calories: "",
        protein: "",
        carbs: "",
        fat: "",
      })
    }, 2000)
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold tracking-tight mb-6">Log Food</h1>

      <Card>
        <CardHeader>
          <CardTitle>Add Food Entry</CardTitle>
          <CardDescription>Enter the details of your meal to track your nutrition.</CardDescription>
        </CardHeader>
        <CardContent>
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-6">
              <CheckCircle2 className="h-12 w-12 text-green-500 mb-2" />
              <h3 className="text-xl font-medium">Food Logged Successfully!</h3>
              <p className="text-muted-foreground text-center mt-1">Your nutrition data has been updated.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="mealName">Meal Name</Label>
                <Input
                  id="mealName"
                  name="mealName"
                  placeholder="e.g., Chicken Salad"
                  value={formData.mealName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mealType">Meal Type</Label>
                <Select value={formData.mealType} onValueChange={handleSelectChange} required>
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
                    placeholder="e.g., 12"
                    value={formData.fat}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full">
                Log Food
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

