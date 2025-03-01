// Construction material calculation formulas based on https://buildformula.com/50-essential-formulas-for-civil-site-engineers-and-supervisors/

// Concrete volume calculation
export function calculateConcreteVolume(length: number, width: number, depth: number): number {
  // Volume in cubic meters
  return length * width * depth
}

// Cement calculation for concrete (1:2:4 ratio)
export function calculateCementForConcrete(concreteVolume: number, ratio = "1:2:4"): number {
  // Parse the ratio
  const parts = ratio.split(":").map((part) => Number.parseInt(part))
  const cementPart = parts[0]
  const totalParts = parts.reduce((sum, part) => sum + part, 0)

  // Dry volume is 1.54 times the wet volume
  const dryVolume = concreteVolume * 1.54

  // Cement volume in cubic meters
  const cementVolume = (dryVolume * cementPart) / totalParts

  // 1 cubic meter of cement = 1440 kg (approx)
  return Math.ceil(cementVolume * 1440)
}

// Sand calculation for concrete
export function calculateSandForConcrete(concreteVolume: number, ratio = "1:2:4"): number {
  // Parse the ratio
  const parts = ratio.split(":").map((part) => Number.parseInt(part))
  const sandPart = parts[1]
  const totalParts = parts.reduce((sum, part) => sum + part, 0)

  // Dry volume is 1.54 times the wet volume
  const dryVolume = concreteVolume * 1.54

  // Sand volume in cubic meters
  const sandVolume = (dryVolume * sandPart) / totalParts

  // 1 cubic meter of sand = 1600 kg (approx)
  return Math.ceil(sandVolume * 1600)
}

// Aggregate/Gravel calculation for concrete
export function calculateAggregateForConcrete(concreteVolume: number, ratio = "1:2:4"): number {
  // Parse the ratio
  const parts = ratio.split(":").map((part) => Number.parseInt(part))
  const aggregatePart = parts[2]
  const totalParts = parts.reduce((sum, part) => sum + part, 0)

  // Dry volume is 1.54 times the wet volume
  const dryVolume = concreteVolume * 1.54

  // Aggregate volume in cubic meters
  const aggregateVolume = (dryVolume * aggregatePart) / totalParts

  // 1 cubic meter of aggregate = 1450 kg (approx)
  return Math.ceil(aggregateVolume * 1450)
}

// Steel reinforcement calculation
export function calculateSteelReinforcement(concreteVolume: number, ratio = 80): number {
  // Steel in kg per cubic meter of concrete
  return Math.ceil(concreteVolume * ratio)
}

// Brick calculation
export function calculateBricks(wallLength: number, wallHeight: number, wallThickness: number): number {
  // Standard brick size: 0.19 x 0.09 x 0.09 m (with mortar)
  const brickVolume = 0.19 * 0.09 * 0.09

  // Wall volume in cubic meters
  const wallVolume = wallLength * wallHeight * wallThickness

  // Number of bricks
  return Math.ceil(wallVolume / brickVolume)
}

// Mortar calculation for brickwork (1:6 ratio)
export function calculateMortarForBrickwork(
  brickCount: number,
  ratio = "1:6",
): {
  cement: number
  sand: number
} {
  // Volume of mortar per brick (approx 0.0011 cubic meters)
  const mortarVolumePerBrick = 0.0011
  const totalMortarVolume = brickCount * mortarVolumePerBrick

  // Parse the ratio
  const parts = ratio.split(":").map((part) => Number.parseInt(part))
  const cementPart = parts[0]
  const sandPart = parts[1]
  const totalParts = parts.reduce((sum, part) => sum + part, 0)

  // Cement volume in cubic meters
  const cementVolume = (totalMortarVolume * cementPart) / totalParts

  // Sand volume in cubic meters
  const sandVolume = (totalMortarVolume * sandPart) / totalParts

  // 1 cubic meter of cement = 1440 kg, 1 cubic meter of sand = 1600 kg
  return {
    cement: Math.ceil(cementVolume * 1440),
    sand: Math.ceil(sandVolume * 1600),
  }
}

// Plaster calculation (1:6 ratio)
export function calculatePlaster(
  area: number,
  thickness: number,
  ratio = "1:6",
): {
  cement: number
  sand: number
} {
  // Thickness in meters
  const thicknessInMeters = thickness / 1000

  // Volume of plaster in cubic meters
  const plasterVolume = area * thicknessInMeters

  // Parse the ratio
  const parts = ratio.split(":").map((part) => Number.parseInt(part))
  const cementPart = parts[0]
  const sandPart = parts[1]
  const totalParts = parts.reduce((sum, part) => sum + part, 0)

  // Cement volume in cubic meters
  const cementVolume = (plasterVolume * cementPart) / totalParts

  // Sand volume in cubic meters
  const sandVolume = (plasterVolume * sandPart) / totalParts

  // 1 cubic meter of cement = 1440 kg, 1 cubic meter of sand = 1600 kg
  return {
    cement: Math.ceil(cementVolume * 1440),
    sand: Math.ceil(sandVolume * 1600),
  }
}

// RCC slab calculation
export function calculateRCCSlab(
  length: number,
  width: number,
  thickness: number,
): {
  concrete: number
  cement: number
  sand: number
  aggregate: number
  steel: number
} {
  // Thickness in meters
  const thicknessInMeters = thickness / 1000

  // Volume of concrete in cubic meters
  const concreteVolume = length * width * thicknessInMeters

  // Calculate materials using standard functions
  const cement = calculateCementForConcrete(concreteVolume)
  const sand = calculateSandForConcrete(concreteVolume)
  const aggregate = calculateAggregateForConcrete(concreteVolume)

  // Steel for RCC slab (100 kg per cubic meter)
  const steel = calculateSteelReinforcement(concreteVolume, 100)

  return {
    concrete: Math.ceil(concreteVolume * 100) / 100, // Round to 2 decimal places
    cement,
    sand,
    aggregate,
    steel,
  }
}

// Column calculation
export function calculateColumn(
  length: number,
  width: number,
  height: number,
): {
  concrete: number
  cement: number
  sand: number
  aggregate: number
  steel: number
} {
  // Volume of concrete in cubic meters
  const concreteVolume = length * width * height

  // Calculate materials using standard functions
  const cement = calculateCementForConcrete(concreteVolume)
  const sand = calculateSandForConcrete(concreteVolume)
  const aggregate = calculateAggregateForConcrete(concreteVolume)

  // Steel for columns (120 kg per cubic meter)
  const steel = calculateSteelReinforcement(concreteVolume, 120)

  return {
    concrete: Math.ceil(concreteVolume * 100) / 100, // Round to 2 decimal places
    cement,
    sand,
    aggregate,
    steel,
  }
}

// Beam calculation
export function calculateBeam(
  length: number,
  width: number,
  depth: number,
): {
  concrete: number
  cement: number
  sand: number
  aggregate: number
  steel: number
} {
  // Volume of concrete in cubic meters
  const concreteVolume = length * width * depth

  // Calculate materials using standard functions
  const cement = calculateCementForConcrete(concreteVolume)
  const sand = calculateSandForConcrete(concreteVolume)
  const aggregate = calculateAggregateForConcrete(concreteVolume)

  // Steel for beams (100 kg per cubic meter)
  const steel = calculateSteelReinforcement(concreteVolume, 100)

  return {
    concrete: Math.ceil(concreteVolume * 100) / 100, // Round to 2 decimal places
    cement,
    sand,
    aggregate,
    steel,
  }
}

// Foundation calculation
export function calculateFoundation(
  length: number,
  width: number,
  depth: number,
): {
  concrete: number
  cement: number
  sand: number
  aggregate: number
  steel: number
} {
  // Volume of concrete in cubic meters
  const concreteVolume = length * width * depth

  // Calculate materials using standard functions
  const cement = calculateCementForConcrete(concreteVolume, "1:3:6") // Different ratio for foundation
  const sand = calculateSandForConcrete(concreteVolume, "1:3:6")
  const aggregate = calculateAggregateForConcrete(concreteVolume, "1:3:6")

  // Steel for foundation (80 kg per cubic meter)
  const steel = calculateSteelReinforcement(concreteVolume, 80)

  return {
    concrete: Math.ceil(concreteVolume * 100) / 100, // Round to 2 decimal places
    cement,
    sand,
    aggregate,
    steel,
  }
}

// Total building material calculation
export interface BuildingDimensions {
  // Foundation
  foundationLength: number
  foundationWidth: number
  foundationDepth: number

  // Columns
  columnCount: number
  columnLength: number
  columnWidth: number
  columnHeight: number

  // Beams
  beamLength: number
  beamWidth: number
  beamDepth: number
  beamCount: number

  // Walls
  wallLength: number
  wallHeight: number
  wallThickness: number

  // Slabs
  slabLength: number
  slabWidth: number
  slabThickness: number // in mm
}

export interface MaterialCalculation {
  concrete: number // cubic meters
  cement: number // kg
  sand: number // kg
  aggregate: number // kg
  steel: number // kg
  bricks: number // pieces
}

export function calculateTotalMaterials(dimensions: BuildingDimensions): MaterialCalculation {
  // Calculate foundation materials
  const foundation = calculateFoundation(
    dimensions.foundationLength,
    dimensions.foundationWidth,
    dimensions.foundationDepth,
  )

  // Calculate column materials
  const singleColumn = calculateColumn(dimensions.columnLength, dimensions.columnWidth, dimensions.columnHeight)
  const columns = {
    concrete: singleColumn.concrete * dimensions.columnCount,
    cement: singleColumn.cement * dimensions.columnCount,
    sand: singleColumn.sand * dimensions.columnCount,
    aggregate: singleColumn.aggregate * dimensions.columnCount,
    steel: singleColumn.steel * dimensions.columnCount,
  }

  // Calculate beam materials
  const singleBeam = calculateBeam(dimensions.beamLength, dimensions.beamWidth, dimensions.beamDepth)
  const beams = {
    concrete: singleBeam.concrete * dimensions.beamCount,
    cement: singleBeam.cement * dimensions.beamCount,
    sand: singleBeam.sand * dimensions.beamCount,
    aggregate: singleBeam.aggregate * dimensions.beamCount,
    steel: singleBeam.steel * dimensions.beamCount,
  }

  // Calculate slab materials
  const slab = calculateRCCSlab(dimensions.slabLength, dimensions.slabWidth, dimensions.slabThickness)

  // Calculate brick wall
  const bricks = calculateBricks(dimensions.wallLength, dimensions.wallHeight, dimensions.wallThickness)

  // Calculate mortar for brickwork
  const mortar = calculateMortarForBrickwork(bricks)

  // Sum up all materials
  return {
    concrete: foundation.concrete + columns.concrete + beams.concrete + slab.concrete,
    cement: foundation.cement + columns.cement + beams.cement + slab.cement + mortar.cement,
    sand: foundation.sand + columns.sand + beams.sand + slab.sand + mortar.sand,
    aggregate: foundation.aggregate + columns.aggregate + beams.aggregate + slab.aggregate,
    steel: foundation.steel + columns.steel + beams.steel + slab.steel,
    bricks: bricks,
  }
}

