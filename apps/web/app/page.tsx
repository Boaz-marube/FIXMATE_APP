"use client"

import { ModeToggle } from "./components/theme/mode-toggle"
import { Header } from "./components/ui/header"

export default function HomePage() {

  return (
    <>
      <Header/>
      <h1 className="text-white-800 bg-black font-[Poppins]">Hello World, This is the font-family called Poppins and I really love it </h1>
      <ModeToggle/>
    </>
  )
}