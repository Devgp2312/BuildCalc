import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "BuildCalc Pro | Construction Material Calculator",
  description:
    "Upload your SketchUp or Autodesk files and get accurate material calculations for your construction projects. Save time and reduce waste with precise estimates for cement, sand, iron, and more.",
  keywords:
    "construction calculator, building materials, SketchUp, Autodesk, material estimation, cement calculator, construction planning, BIM",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}



import './globals.css'