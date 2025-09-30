"use client"

import { HeroSection } from "./components/landing/heroSection"
import { ServiceGrid } from "./components/landing/serviceSection"
import { Testimonials } from "./components/landing/testimonialSection"
import { Values } from "./components/landing/values"
import { Footer } from "./components/ui/footer"
import { Header } from "./components/ui/header"

export default function HomePage() {

  return (
    <>
      <Header/>
      <HeroSection/>
      <ServiceGrid/>
      <Values/>
      <Testimonials/>
      <Footer/>
    </>
  )
}