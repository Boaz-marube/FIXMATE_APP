"use client"

import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Button } from "../ui/button"
import { useState } from "react"

export function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Wanjiku",
      image: "/professional-woman-smiling.png",
      text: "FixMate saved my day! My plumber arrived within 30 minutes and fixed my burst pipe professionally. Highly recommended!",
      rating: 5,
    },
    {
      name: "James Mwangi",
      image: "/professional-man-smiling.png",
      text: "The electrician was knowledgeable and fixed my wiring issues quickly. Great service and fair pricing.",
      rating: 5,
    },
    {
      name: "Grace Akinyi",
      image: "/professional-woman-smiling.png",
      text: "Excellent carpenter service! They built custom shelves exactly as I wanted. Will definitely use FixMate again.",
      rating: 5,
    },
  ] 

  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">What Our Customers Say</h2>
          <p className="text-xl text-muted-foreground">Real experiences from satisfied customers</p>
        </div>

        <div className="max-w-2xl mx-auto relative">
          <Card className="border-2">
            <CardContent className="p-8 text-center">
              <img
                src={testimonials[currentIndex]?.image || "/placeholder.svg"}
                alt={testimonials[currentIndex]?.name || "User"}
                className="w-16 h-16 rounded-full mx-auto mb-4"
              />
              <div className="flex justify-center mb-4">
                {[...Array(testimonials[currentIndex]?.rating || 0)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-lg text-muted-foreground mb-4 italic">"{testimonials[currentIndex]?.text || ''}"</p>
              <h4 className="font-bold text-foreground">{testimonials[currentIndex]?.name || 'Anonymous'}</h4>
            </CardContent>
          </Card>

          <div className="flex justify-center gap-4 mt-6">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="border-orange-400 text-orange-600 hover:bg-orange-500 hover:text-white bg-transparent dark:border-orange-500 dark:text-orange-400"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="border-orange-400 text-orange-600 hover:bg-orange-500 hover:text-white bg-transparent dark:border-orange-500 dark:text-orange-400"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
