import Link from "next/link"
import { ArrowLeft, HardHat } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function FormulasPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Link href="/" className="flex items-center space-x-2">
            <HardHat className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">BuildCalc Pro</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 container py-8">
        <div className="flex items-center mb-8">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back to home</span>
            </Link>
          </Button>
          <h1 className="text-2xl font-bold ml-2">Construction Formulas</h1>
        </div>

        <div className="grid gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Concrete Volume Calculation</CardTitle>
              <CardDescription>Basic formula for calculating concrete volume</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="font-medium">Formula:</p>
                <div className="p-4 bg-muted rounded-md">
                  <p className="font-mono">Volume (m³) = Length (m) × Width (m) × Depth (m)</p>
                </div>
                <p>This formula calculates the volume of concrete required for a given structure.</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cement, Sand, and Aggregate Calculation</CardTitle>
              <CardDescription>Calculating materials for concrete mix</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="font-medium">Formula for 1:2:4 ratio concrete:</p>
                <div className="p-4 bg-muted rounded-md">
                  <p className="font-mono">Dry Volume = Wet Volume × 1.54</p>
                  <p className="font-mono">Cement (m³) = (Dry Volume × 1) ÷ 7</p>
                  <p className="font-mono">Sand (m³) = (Dry Volume × 2) ÷ 7</p>
                  <p className="font-mono">Aggregate (m³) = (Dry Volume × 4) ÷ 7</p>
                </div>
                <p>To convert to weight:</p>
                <div className="p-4 bg-muted rounded-md">
                  <p className="font-mono">Cement (kg) = Cement (m³) × 1440 kg/m³</p>
                  <p className="font-mono">Sand (kg) = Sand (m³) × 1600 kg/m³</p>
                  <p className="font-mono">Aggregate (kg) = Aggregate (m³) × 1450 kg/m³</p>
                </div>
                <p>
                  These formulas calculate the amount of cement, sand, and aggregate required for concrete based on the
                  standard mix ratio.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Steel Reinforcement Calculation</CardTitle>
              <CardDescription>Calculating steel requirements for RCC structures</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="font-medium">Formula:</p>
                <div className="p-4 bg-muted rounded-md">
                  <p className="font-mono">Steel (kg) = Concrete Volume (m³) × Steel Ratio (kg/m³)</p>
                </div>
                <p>Standard steel ratios:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Foundation: 80 kg/m³</li>
                  <li>Columns: 120 kg/m³</li>
                  <li>Beams: 100 kg/m³</li>
                  <li>Slabs: 100 kg/m³</li>
                </ul>
                <p>This formula calculates the amount of steel reinforcement required for RCC structures.</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Brick Calculation</CardTitle>
              <CardDescription>Calculating the number of bricks required</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="font-medium">Formula:</p>
                <div className="p-4 bg-muted rounded-md">
                  <p className="font-mono">Wall Volume (m³) = Length (m) × Height (m) × Thickness (m)</p>
                  <p className="font-mono">Number of Bricks = Wall Volume (m³) ÷ Volume of One Brick (m³)</p>
                </div>
                <p>Standard brick size with mortar: 0.19m × 0.09m × 0.09m</p>
                <p>This formula calculates the number of bricks required for a wall of given dimensions.</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Mortar Calculation for Brickwork</CardTitle>
              <CardDescription>Calculating cement and sand for brick mortar</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="font-medium">Formula for 1:6 ratio mortar:</p>
                <div className="p-4 bg-muted rounded-md">
                  <p className="font-mono">Mortar Volume = Number of Bricks × 0.0011 m³</p>
                  <p className="font-mono">Cement (m³) = (Mortar Volume × 1) ÷ 7</p>
                  <p className="font-mono">Sand (m³) = (Mortar Volume × 6) ÷ 7</p>
                </div>
                <p>To convert to weight:</p>
                <div className="p-4 bg-muted rounded-md">
                  <p className="font-mono">Cement (kg) = Cement (m³) × 1440 kg/m³</p>
                  <p className="font-mono">Sand (kg) = Sand (m³) × 1600 kg/m³</p>
                </div>
                <p>These formulas calculate the amount of cement and sand required for brick mortar.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="w-full border-t bg-background py-6 md:py-8">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <HardHat className="h-5 w-5 text-primary" />
            <span className="font-semibold">BuildCalc Pro</span>
          </div>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} BuildCalc Pro. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

