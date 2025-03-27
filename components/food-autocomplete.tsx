"use client";

import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

interface FoodItem {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface FoodAutocompleteProps {
  onSelectFood: (food: FoodItem) => void;
}

export function FoodAutocomplete({ onSelectFood }: FoodAutocompleteProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<FoodItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Close dropdown when clicking outside
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    setIsLoading(true);
    const timeout = setTimeout(() => {
      fetch(`/api/search-food?query=${encodeURIComponent(query)}`)
        .then((res) => res.json())
        .then((data) => {
          setResults(data);
          setShowDropdown(true);
        })
        .catch((error) => {
          console.error("Error searching for foods:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  const handleSelect = (food: FoodItem) => {
    onSelectFood(food);
    setQuery(food.name);
    setShowDropdown(false);
  };

  return (
    <div className="relative">
      <div className="space-y-2">
        <Label htmlFor="food-search">Search Food Database</Label>
        <div className="flex items-center relative">
          <Input
            id="food-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a food (e.g., apple, chicken)"
            className="w-full"
          />
          {isLoading && (
            <Loader2 className="animate-spin h-4 w-4 absolute right-3" />
          )}
        </div>
      </div>

      {showDropdown && results.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute z-10 mt-1 w-full bg-background border rounded-md shadow-lg max-h-60 overflow-auto"
        >
          {results.map((food) => (
            <div
              key={food.id}
              className="p-2 hover:bg-muted cursor-pointer border-b last:border-0"
              onClick={() => handleSelect(food)}
            >
              <div className="font-medium">{food.name}</div>
              <div className="text-xs text-muted-foreground flex justify-between">
                <span>{food.calories} kcal</span>
                <span>
                  P: {food.protein}g C: {food.carbs}g F: {food.fat}g
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
