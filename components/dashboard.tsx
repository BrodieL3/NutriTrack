import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UtensilsCrossed, Weight, Footprints, Moon, ArrowRight } from "lucide-react"
import { MacroChart } from "@/components/macro-chart"

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Daily Nutrition Summary</h1>
        <div className="text-sm text-muted-foreground">Monday, March 25, 2024</div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Calories</CardTitle>
            <CardDescription>Daily Goal: 2,000 kcal</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1,250</div>
            <div className="mt-1 h-2 w-full rounded-full bg-muted">
              <div className="h-full w-[62.5%] rounded-full bg-primary"></div>
            </div>
            <div className="mt-1 text-xs text-muted-foreground">750 kcal remaining</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Macronutrients</CardTitle>
            <CardDescription>Protein, Carbs, Fat</CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="h-[150px]">
              <MacroChart />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Quick Actions</CardTitle>
            <CardDescription>Log your progress</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2">
            <Button className="w-full justify-between" variant="outline">
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
    </div>
  )
}

