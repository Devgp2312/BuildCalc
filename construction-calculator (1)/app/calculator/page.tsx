"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Download, FileUp, HardHat, Info, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { parseCADFile } from "@/lib/file-parser"
import { calculateTotalMaterials, type BuildingDimensions, type MaterialCalculation } from "@/lib/construction-formulas"

export default function CalculatorPage() {
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [results, setResults] = useState<MaterialCalculation | null>(null)
  const [buildingDimensions, setBuildingDimensions] = useState<BuildingDimensions | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      const fileExtension = selectedFile.name.split(".").pop()?.toLowerCase()

      // Check if file type is supported
      const supportedExtensions = ["skp", "dwg", "rvt", "ifc", "dxf", "3ds"]
      if (fileExtension && supportedExtensions.includes(fileExtension)) {
        setFile(selectedFile)
        setError(null)
      } else {
        setError("Unsupported file format. Please upload a SketchUp, AutoCAD, or Revit file.")
        setFile(null)
      }
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setIsUploading(true)
    setProgress(0)
    setError(null)

    // Simulate upload progress
    const uploadInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(uploadInterval)
          return 100
        }
        return prev + 5
      })
    }, 100)

    try {
      // Wait for upload to complete
      await new Promise((resolve) => setTimeout(resolve, 2000))
      clearInterval(uploadInterval)
      setProgress(100)
      setIsUploading(false)
      setIsProcessing(true)

      // Parse the CAD file
      const dimensions = await parseCADFile(file)
      setBuildingDimensions(dimensions)

      // Calculate materials based on dimensions
      const materials = calculateTotalMaterials(dimensions)
      setResults(materials)

      setIsProcessing(false)
    } catch (err) {
      clearInterval(uploadInterval)
      setIsUploading(false)
      setIsProcessing(false)
      setError("Error processing file. Please try again.")
      console.error(err)
    }
  }

  const resetCalculator = () => {
    setFile(null)
    setResults(null)
    setBuildingDimensions(null)
    setProgress(0)
    setError(null)
  }

  const downloadReport = () => {
    if (!results || !buildingDimensions) return

    // Create report content
    let reportContent = "BuildCalc Pro - Material Calculation Report\n"
    reportContent += "===========================================\n\n"
    reportContent += `File: ${file?.name}\n`
    reportContent += `Date: ${new Date().toLocaleDateString()}\n\n`

    reportContent += "Building Dimensions:\n"
    reportContent += "-----------------\n"
    reportContent += `Foundation: ${buildingDimensions.foundationLength.toFixed(2)}m x ${buildingDimensions.foundationWidth.toFixed(2)}m x ${buildingDimensions.foundationDepth.toFixed(2)}m\n`
    reportContent += `Columns: ${buildingDimensions.columnCount} columns (${buildingDimensions.columnLength}m x ${buildingDimensions.columnWidth}m x ${buildingDimensions.columnHeight}m)\n`
    reportContent += `Beams: ${buildingDimensions.beamCount} beams (${buildingDimensions.beamLength.toFixed(2)}m x ${buildingDimensions.beamWidth}m x ${buildingDimensions.beamDepth}m)\n`
    reportContent += `Walls: ${buildingDimensions.wallLength.toFixed(2)}m length, ${buildingDimensions.wallHeight}m height, ${buildingDimensions.wallThickness}m thickness\n`
    reportContent += `Slabs: ${buildingDimensions.slabLength.toFixed(2)}m x ${buildingDimensions.slabWidth.toFixed(2)}m x ${buildingDimensions.slabThickness}mm\n\n`

    reportContent += "Material Requirements:\n"
    reportContent += "---------------------\n"
    reportContent += `Concrete: ${results.concrete.toFixed(2)} m³\n`
    reportContent += `Cement: ${results.cement.toFixed(2)} kg (${Math.ceil(results.cement / 50)} bags of 50kg)\n`
    reportContent += `Sand: ${results.sand.toFixed(2)} kg (${(results.sand / 1600).toFixed(2)} m³)\n`
    reportContent += `Aggregate/Gravel: ${results.aggregate.toFixed(2)} kg (${(results.aggregate / 1450).toFixed(2)} m³)\n`
    reportContent += `Steel/Iron: ${results.steel.toFixed(2)} kg\n`
    reportContent += `Bricks: ${results.bricks} pieces\n\n`

    reportContent += "Note: These calculations are based on standard construction practices and formulas.\n"
    reportContent += "Actual requirements may vary based on specific site conditions and construction methods.\n"

    // Create a blob and download
    const blob = new Blob([reportContent], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `BuildCalc_Report_${new Date().toISOString().split("T")[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

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
          <h1 className="text-2xl font-bold ml-2">Material Calculator</h1>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Upload Your Design File</CardTitle>
              <CardDescription>
                Upload your SketchUp, AutoCAD, or Revit file to calculate material requirements using industry-standard
                formulas
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error && <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-md">{error}</div>}

              {!file && !results ? (
                <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-12 text-center">
                  <FileUp className="h-8 w-8 text-muted-foreground mb-4" />
                  <h3 className="font-medium text-lg mb-2">Drag and drop your file here</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Supports .skp, .dwg, .rvt, .ifc, and other CAD formats
                  </p>
                  <Button asChild>
                    <label>
                      Browse Files
                      <input
                        type="file"
                        className="hidden"
                        accept=".skp,.dwg,.rvt,.ifc,.dxf,.3ds"
                        onChange={handleFileChange}
                      />
                    </label>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {file && !results && (
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center">
                        <FileUp className="h-5 w-5 text-primary mr-2" />
                        <span className="font-medium">{file.name}</span>
                        <span className="ml-2 text-sm text-muted-foreground">
                          ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                        </span>
                      </div>
                      <Button variant="outline" onClick={resetCalculator}>
                        Change
                      </Button>
                    </div>
                  )}

                  {isUploading && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Uploading...</span>
                        <span>{progress}%</span>
                      </div>
                      <Progress value={progress} />
                    </div>
                  )}

                  {isProcessing && (
                    <div className="flex items-center justify-center p-8">
                      <Loader2 className="h-8 w-8 text-primary animate-spin mr-2" />
                      <span>Analyzing file and calculating materials using construction formulas...</span>
                    </div>
                  )}

                  {results && buildingDimensions && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <Card>
                          <CardHeader className="p-4 pb-2">
                            <CardTitle className="text-base">Cement</CardTitle>
                          </CardHeader>
                          <CardContent className="p-4 pt-0">
                            <p className="text-2xl font-bold">{results.cement.toFixed(0)} kg</p>
                            <p className="text-sm text-muted-foreground">
                              ~{Math.ceil(results.cement / 50)} bags (50kg)
                            </p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader className="p-4 pb-2">
                            <CardTitle className="text-base">Sand</CardTitle>
                          </CardHeader>
                          <CardContent className="p-4 pt-0">
                            <p className="text-2xl font-bold">{results.sand.toFixed(0)} kg</p>
                            <p className="text-sm text-muted-foreground">~{(results.sand / 1600).toFixed(1)} m³</p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader className="p-4 pb-2">
                            <CardTitle className="text-base">Gravel/Aggregate</CardTitle>
                          </CardHeader>
                          <CardContent className="p-4 pt-0">
                            <p className="text-2xl font-bold">{results.aggregate.toFixed(0)} kg</p>
                            <p className="text-sm text-muted-foreground">~{(results.aggregate / 1450).toFixed(1)} m³</p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader className="p-4 pb-2">
                            <CardTitle className="text-base">Steel/Iron</CardTitle>
                          </CardHeader>
                          <CardContent className="p-4 pt-0">
                            <p className="text-2xl font-bold">{results.steel.toFixed(0)} kg</p>
                            <p className="text-sm text-muted-foreground">Reinforcement bars</p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader className="p-4 pb-2">
                            <CardTitle className="text-base">Bricks</CardTitle>
                          </CardHeader>
                          <CardContent className="p-4 pt-0">
                            <p className="text-2xl font-bold">{results.bricks}</p>
                            <p className="text-sm text-muted-foreground">Standard size</p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader className="p-4 pb-2">
                            <CardTitle className="text-base">Concrete</CardTitle>
                          </CardHeader>
                          <CardContent className="p-4 pt-0">
                            <p className="text-2xl font-bold">{results.concrete.toFixed(2)} m³</p>
                            <p className="text-sm text-muted-foreground">Ready-mix</p>
                          </CardContent>
                        </Card>
                      </div>

                      <div className="flex justify-between">
                        <Button variant="outline" onClick={resetCalculator}>
                          Calculate Another
                        </Button>
                        <Button onClick={downloadReport}>
                          <Download className="h-4 w-4 mr-2" />
                          Download Report
                        </Button>
                      </div>
                    </div>
                  )}

                  {file && !results && !isProcessing && !isUploading && (
                    <div className="flex justify-end">
                      <Button onClick={handleUpload}>Calculate Materials</Button>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {results && buildingDimensions && (
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Building Dimensions</CardTitle>
                <CardDescription>Extracted dimensions from your design file</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h3 className="font-medium">Foundation</h3>
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div className="p-2 bg-muted rounded">
                          <div className="text-muted-foreground">Length</div>
                          <div>{buildingDimensions.foundationLength.toFixed(2)} m</div>
                        </div>
                        <div className="p-2 bg-muted rounded">
                          <div className="text-muted-foreground">Width</div>
                          <div>{buildingDimensions.foundationWidth.toFixed(2)} m</div>
                        </div>
                        <div className="p-2 bg-muted rounded">
                          <div className="text-muted-foreground">Depth</div>
                          <div>{buildingDimensions.foundationDepth.toFixed(2)} m</div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-medium">Columns</h3>
                      <div className="grid grid-cols-4 gap-2 text-sm">
                        <div className="p-2 bg-muted rounded">
                          <div className="text-muted-foreground">Count</div>
                          <div>{buildingDimensions.columnCount}</div>
                        </div>
                        <div className="p-2 bg-muted rounded">
                          <div className="text-muted-foreground">Length</div>
                          <div>{buildingDimensions.columnLength} m</div>
                        </div>
                        <div className="p-2 bg-muted rounded">
                          <div className="text-muted-foreground">Width</div>
                          <div>{buildingDimensions.columnWidth} m</div>
                        </div>
                        <div className="p-2 bg-muted rounded">
                          <div className="text-muted-foreground">Height</div>
                          <div>{buildingDimensions.columnHeight} m</div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-medium">Beams</h3>
                      <div className="grid grid-cols-4 gap-2 text-sm">
                        <div className="p-2 bg-muted rounded">
                          <div className="text-muted-foreground">Count</div>
                          <div>{buildingDimensions.beamCount}</div>
                        </div>
                        <div className="p-2 bg-muted rounded">
                          <div className="text-muted-foreground">Length</div>
                          <div>{buildingDimensions.beamLength.toFixed(2)} m</div>
                        </div>
                        <div className="p-2 bg-muted rounded">
                          <div className="text-muted-foreground">Width</div>
                          <div>{buildingDimensions.beamWidth} m</div>
                        </div>
                        <div className="p-2 bg-muted rounded">
                          <div className="text-muted-foreground">Depth</div>
                          <div>{buildingDimensions.beamDepth} m</div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-medium">Walls</h3>
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div className="p-2 bg-muted rounded">
                          <div className="text-muted-foreground">Length</div>
                          <div>{buildingDimensions.wallLength.toFixed(2)} m</div>
                        </div>
                        <div className="p-2 bg-muted rounded">
                          <div className="text-muted-foreground">Height</div>
                          <div>{buildingDimensions.wallHeight} m</div>
                        </div>
                        <div className="p-2 bg-muted rounded">
                          <div className="text-muted-foreground">Thickness</div>
                          <div>{buildingDimensions.wallThickness} m</div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-medium">Slabs</h3>
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div className="p-2 bg-muted rounded">
                          <div className="text-muted-foreground">Length</div>
                          <div>{buildingDimensions.slabLength.toFixed(2)} m</div>
                        </div>
                        <div className="p-2 bg-muted rounded">
                          <div className="text-muted-foreground">Width</div>
                          <div>{buildingDimensions.slabWidth.toFixed(2)} m</div>
                        </div>
                        <div className="p-2 bg-muted rounded">
                          <div className="text-muted-foreground">Thickness</div>
                          <div>{buildingDimensions.slabThickness} mm</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {results && buildingDimensions && (
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Detailed Analysis</CardTitle>
                <CardDescription>Breakdown of materials by building components</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="foundation">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="foundation">Foundation</TabsTrigger>
                    <TabsTrigger value="columns">Columns</TabsTrigger>
                    <TabsTrigger value="beams">Beams</TabsTrigger>
                    <TabsTrigger value="slabs">Slabs</TabsTrigger>
                  </TabsList>
                  <TabsContent value="foundation" className="p-4">
                    <div className="space-y-4">
                      {/* Calculate foundation materials */}
                      {(() => {
                        const foundation = {
                          concrete:
                            buildingDimensions.foundationLength *
                            buildingDimensions.foundationWidth *
                            buildingDimensions.foundationDepth,
                          cement:
                            buildingDimensions.foundationLength *
                            buildingDimensions.foundationWidth *
                            buildingDimensions.foundationDepth *
                            1.54 *
                            (1 / 10) *
                            1440,
                          sand:
                            buildingDimensions.foundationLength *
                            buildingDimensions.foundationWidth *
                            buildingDimensions.foundationDepth *
                            1.54 *
                            (3 / 10) *
                            1600,
                          aggregate:
                            buildingDimensions.foundationLength *
                            buildingDimensions.foundationWidth *
                            buildingDimensions.foundationDepth *
                            1.54 *
                            (6 / 10) *
                            1450,
                          steel:
                            buildingDimensions.foundationLength *
                            buildingDimensions.foundationWidth *
                            buildingDimensions.foundationDepth *
                            80,
                        }

                        return (
                          <>
                            <div className="flex items-center justify-between">
                              <span>Concrete</span>
                              <span className="font-medium">{foundation.concrete.toFixed(2)} m³</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span>Steel Reinforcement</span>
                              <span className="font-medium">{foundation.steel.toFixed(0)} kg</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span>Cement</span>
                              <span className="font-medium">{foundation.cement.toFixed(0)} kg</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span>Sand</span>
                              <span className="font-medium">{foundation.sand.toFixed(0)} kg</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span>Gravel</span>
                              <span className="font-medium">{foundation.aggregate.toFixed(0)} kg</span>
                            </div>
                          </>
                        )
                      })()}
                    </div>
                  </TabsContent>
                  <TabsContent value="columns" className="p-4">
                    <div className="space-y-4">
                      {/* Calculate column materials */}
                      {(() => {
                        const columnVolume =
                          buildingDimensions.columnLength *
                          buildingDimensions.columnWidth *
                          buildingDimensions.columnHeight
                        const columns = {
                          concrete: columnVolume * buildingDimensions.columnCount,
                          cement: columnVolume * buildingDimensions.columnCount * 1.54 * (1 / 7) * 1440,
                          sand: columnVolume * buildingDimensions.columnCount * 1.54 * (2 / 7) * 1600,
                          aggregate: columnVolume * buildingDimensions.columnCount * 1.54 * (4 / 7) * 1450,
                          steel: columnVolume * buildingDimensions.columnCount * 120,
                        }

                        return (
                          <>
                            <div className="flex items-center justify-between">
                              <span>Concrete</span>
                              <span className="font-medium">{columns.concrete.toFixed(2)} m³</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span>Steel Reinforcement</span>
                              <span className="font-medium">{columns.steel.toFixed(0)} kg</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span>Cement</span>
                              <span className="font-medium">{columns.cement.toFixed(0)} kg</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span>Sand</span>
                              <span className="font-medium">{columns.sand.toFixed(0)} kg</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span>Gravel</span>
                              <span className="font-medium">{columns.aggregate.toFixed(0)} kg</span>
                            </div>
                          </>
                        )
                      })()}
                    </div>
                  </TabsContent>
                  <TabsContent value="beams" className="p-4">
                    <div className="space-y-4">
                      {/* Calculate beam materials */}
                      {(() => {
                        const beamVolume =
                          buildingDimensions.beamLength * buildingDimensions.beamWidth * buildingDimensions.beamDepth
                        const beams = {
                          concrete: beamVolume * buildingDimensions.beamCount,
                          cement: beamVolume * buildingDimensions.beamCount * 1.54 * (1 / 7) * 1440,
                          sand: beamVolume * buildingDimensions.beamCount * 1.54 * (2 / 7) * 1600,
                          aggregate: beamVolume * buildingDimensions.beamCount * 1.54 * (4 / 7) * 1450,
                          steel: beamVolume * buildingDimensions.beamCount * 100,
                        }

                        return (
                          <>
                            <div className="flex items-center justify-between">
                              <span>Concrete</span>
                              <span className="font-medium">{beams.concrete.toFixed(2)} m³</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span>Steel Reinforcement</span>
                              <span className="font-medium">{beams.steel.toFixed(0)} kg</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span>Cement</span>
                              <span className="font-medium">{beams.cement.toFixed(0)} kg</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span>Sand</span>
                              <span className="font-medium">{beams.sand.toFixed(0)} kg</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span>Gravel</span>
                              <span className="font-medium">{beams.aggregate.toFixed(0)} kg</span>
                            </div>
                          </>
                        )
                      })()}
                    </div>
                  </TabsContent>
                  <TabsContent value="slabs" className="p-4">
                    <div className="space-y-4">
                      {/* Calculate slab materials */}
                      {(() => {
                        const slabThicknessInMeters = buildingDimensions.slabThickness / 1000
                        const slabVolume =
                          buildingDimensions.slabLength * buildingDimensions.slabWidth * slabThicknessInMeters
                        const slabs = {
                          concrete: slabVolume,
                          cement: slabVolume * 1.54 * (1 / 7) * 1440,
                          sand: slabVolume * 1.54 * (2 / 7) * 1600,
                          aggregate: slabVolume * 1.54 * (4 / 7) * 1450,
                          steel: slabVolume * 100,
                        }

                        return (
                          <>
                            <div className="flex items-center justify-between">
                              <span>Concrete</span>
                              <span className="font-medium">{slabs.concrete.toFixed(2)} m³</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span>Steel Reinforcement</span>
                              <span className="font-medium">{slabs.steel.toFixed(0)} kg</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span>Cement</span>
                              <span className="font-medium">{slabs.cement.toFixed(0)} kg</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span>Sand</span>
                              <span className="font-medium">{slabs.sand.toFixed(0)} kg</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span>Gravel</span>
                              <span className="font-medium">{slabs.aggregate.toFixed(0)} kg</span>
                            </div>
                          </>
                        )
                      })()}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Info className="h-4 w-4 mr-1" />
                  Calculations based on standard construction formulas
                </div>
                <Button variant="outline" size="sm" onClick={downloadReport}>
                  <Download className="h-4 w-4 mr-2" />
                  Export Details
                </Button>
              </CardFooter>
            </Card>
          )}
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

