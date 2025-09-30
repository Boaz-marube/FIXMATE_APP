import { MapPin, Wrench } from "lucide-react";
import { Button } from "../ui/button";
import '../../../public/herofix.svg'


export function HeroSection(){
    return(
        <section className='bg-gradient-to-br from-orange-50 to-white dark:from-gray-900 dark:to-gray-800 py-20 relative overflow-hidden min-h-[90vh] flex items-center'>
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-20 left-10 w-20 h-20 bg-orange-400 rounded-full blur-xl"></div>
                <div className="absolute bottom-20 right-10 w-32 h-32 bg-orange-300 rounded-full blur-2xl"></div>
                <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-orange-500 rounded-full blur-lg"></div>
            </div>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Content */}
                    <div className="text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
                            <Wrench className="h-4 w-4" />
                            <span>Professional Service</span>
                        </div>
                        
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                            Trusted Fixers,<br />
                            <span className="text-orange-600">On-Demand</span>
                        </h1>
                        
                        <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0">
                            Book reliable handymen anytime, anywhere in Nairobi. Fast, professional, and trusted repair services at your fingertips.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Button 
                                size="lg" 
                                style={{
                                    backgroundColor: "#FF8C42",
                                    backgroundImage: "linear-gradient(276.68deg, #FFB347 20.18%, #FF6B35 94.81%)",
                                    color: "white",
                                }}
                                className="text-white font-bold text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                            >
                                <Wrench className="h-5 w-5 mr-2" />
                                BOOK A FIXER NOW
                            </Button>
                            
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-2 border-orange-400 text-orange-600 hover:bg-orange-500 hover:text-white font-bold text-lg px-8 py-4 bg-transparent dark:border-orange-500 dark:text-orange-400 transition-all duration-300"
                            >
                                <MapPin className="h-5 w-5 mr-2" />
                                EXPLORE SERVICES
                            </Button>
                        </div>
                        
                        {/* Stats */}
                        <div className="flex flex-wrap justify-center lg:justify-start gap-8 mt-12">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-orange-600">500+</div>
                                <div className="text-sm text-muted-foreground">Happy Customers</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-orange-600">50+</div>
                                <div className="text-sm text-muted-foreground">Expert Fixers</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-orange-600">24/7</div>
                                <div className="text-sm text-muted-foreground">Available</div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Visual Element */}
                    <div className="relative lg:block hidden">
                        <div className="relative w-full max-w-md mx-auto">
                            <div className="w-80 h-80 bg-gradient-to-br from-orange-400 to-orange-600 rounded-3xl flex items-center justify-center shadow-2xl transform rotate-6">
                                <div className="text-center text-white">
                                    <Wrench className="h-20 w-20 mx-auto mb-4" />
                                    <div className="text-xl font-bold">Professional Tools</div>
                                    <div className="text-sm opacity-90">Ready to Fix</div>
                                </div>
                            </div>
                            <MapPin className="absolute -top-4 -right-4 h-12 w-12 text-orange-500 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg" />
                            <div className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                    <span className="text-sm font-medium">Available Now</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </section>
    )
}