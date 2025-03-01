import { CardContent } from "@/components/ui/card"
import { CardDescription } from "@/components/ui/card"
import { CardTitle } from "@/components/ui/card"
import { CardHeader } from "@/components/ui/card"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { Calculator, FileUp, HardHat, LayoutGrid, Ruler, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="flex items-center space-x-2">
            <HardHat className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">BuildCalc Pro</span>
          </div>
          <nav className="hidden md:flex ml-10 gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium hover:text-primary transition-colors">
              How It Works
            </Link>
            <Link href="/formulas" className="text-sm font-medium hover:text-primary transition-colors">
              Formulas
            </Link>
            <Link href="#testimonials" className="text-sm font-medium hover:text-primary transition-colors">
              Testimonials
            </Link>
          </nav>
          <div className="ml-auto flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium hover:text-primary transition-colors">
              Login
            </Link>
            <Button asChild>
              <Link href="/calculator">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-white to-blue-50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Precise Material Calculations for Construction Projects
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Upload your SketchUp or Autodesk files and get accurate material estimates instantly. Save time,
                    reduce waste, and optimize your construction budget.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" asChild>
                    <Link href="/calculator">Try It Now</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/formulas">View Formulas</Link>
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full h-[400px] bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl overflow-hidden shadow-lg">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-3/4 h-3/4 bg-white rounded-lg shadow-md p-6 flex flex-col">
                      <div className="flex items-center mb-4">
                        <FileUp className="h-5 w-5 text-primary mr-2" />
                        <span className="font-medium">blueprint-final.skp</span>
                      </div>
                      <div className="flex-1 grid grid-cols-2 gap-4">
                        <div className="bg-blue-50 rounded p-3">
                          <div className="text-sm text-muted-foreground">Cement</div>
                          <div className="font-bold text-lg">1,250 kg</div>
                        </div>
                        <div className="bg-blue-50 rounded p-3">
                          <div className="text-sm text-muted-foreground">Sand</div>
                          <div className="font-bold text-lg">2,800 kg</div>
                        </div>
                        <div className="bg-blue-50 rounded p-3">
                          <div className="text-sm text-muted-foreground">Iron/Steel</div>
                          <div className="font-bold text-lg">750 kg</div>
                        </div>
                        <div className="bg-blue-50 rounded p-3">
                          <div className="text-sm text-muted-foreground">Gravel</div>
                          <div className="font-bold text-lg">3,500 kg</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Everything You Need for Accurate Material Estimation
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform provides comprehensive tools for construction professionals to streamline their material
                  planning process.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <FileUp className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">File Compatibility</h3>
                <p className="text-center text-muted-foreground">
                  Support for SketchUp, AutoCAD, Revit, and other popular CAD formats.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <Calculator className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Precise Calculations</h3>
                <p className="text-center text-muted-foreground">
                  Get accurate estimates using industry-standard construction formulas.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <LayoutGrid className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Visual Reports</h3>
                <p className="text-center text-muted-foreground">
                  Detailed visual breakdowns of material requirements with exportable reports.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <Ruler className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Custom Specifications</h3>
                <p className="text-center text-muted-foreground">
                  Adjust material specifications and mix ratios to match your project requirements.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <Truck className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Supplier Integration</h3>
                <p className="text-center text-muted-foreground">
                  Connect with local suppliers to get quotes based on your material requirements.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <HardHat className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Project Management</h3>
                <p className="text-center text-muted-foreground">
                  Save and manage multiple projects with version control and team collaboration.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-blue-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">How It Works</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Simple Process, Powerful Results</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform makes it easy to get accurate material calculations in just a few steps.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3 mt-12">
              <div className="relative flex flex-col items-center space-y-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white text-2xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-bold">Upload Your File</h3>
                <p className="text-center text-muted-foreground">
                  Upload your SketchUp, AutoCAD, or Revit file to our secure platform.
                </p>
                <div className="hidden md:block absolute top-8 right-0 w-1/2 h-0.5 bg-primary/30"></div>
              </div>
              <div className="relative flex flex-col items-center space-y-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white text-2xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-bold">Analyze & Calculate</h3>
                <p className="text-center text-muted-foreground">
                  Our system analyzes your design and calculates precise material requirements using industry-standard
                  formulas.
                </p>
                <div className="hidden md:block absolute top-8 right-0 w-1/2 h-0.5 bg-primary/30"></div>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white text-2xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-bold">Get Detailed Reports</h3>
                <p className="text-center text-muted-foreground">
                  Receive comprehensive reports with material quantities, costs, and optimization suggestions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Formulas Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                  Construction Formulas
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Industry-Standard Calculation Methods
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform uses proven construction formulas to ensure accurate material estimates.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 mt-12">
              <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle>Concrete Calculation</CardTitle>
                  <CardDescription>Standard formula for concrete volume</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-muted rounded-md">
                    <p className="font-mono">Volume (m³) = Length (m) × Width (m) × Depth (m)</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle>Steel Reinforcement</CardTitle>
                  <CardDescription>Formula for steel requirements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-muted rounded-md">
                    <p className="font-mono">Steel (kg) = Concrete Volume (m³) × Steel Ratio (kg/m³)</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="flex justify-center mt-8">
              <Button asChild>
                <Link href="/formulas">View All Formulas</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Optimize Your Construction Materials?
                </h2>
                <p className="mx-auto max-w-[700px] md:text-xl">
                  Join thousands of construction professionals who are saving time and reducing waste with BuildCalc
                  Pro.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" variant="outline" className="bg-white text-primary hover:bg-white/90" asChild>
                  <Link href="/calculator">Try It Free</Link>
                </Button>
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                  asChild
                >
                  <Link href="/contact">Contact Sales</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
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
          <div className="flex gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary">
              Privacy
            </Link>
            <Link href="/formulas" className="text-sm text-muted-foreground hover:text-primary">
              Formulas
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

