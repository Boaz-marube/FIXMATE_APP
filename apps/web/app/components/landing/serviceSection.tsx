import { Card, CardContent } from "@/components/ui/card";
import { Pipette as Pipe, Zap, Hammer, Wrench, Paintbrush, Car, Drill, Lightbulb} from "lucide-react";
import { Button } from "../ui/button";

export function ServiceGrid(){
    const services = [
        { icon: Pipe, name: "Plumber", description: "Pipes, leaks, installations" },
        { icon: Zap, name: "Electrician", description: "Wiring, outlets, repairs" },
        { icon: Hammer, name: "Carpenter", description: "Furniture, doors, cabinets" },
        { icon: Paintbrush, name: "Painter", description: "Interior & exterior painting" },
        { icon: Car, name: "Mechanic", description: "Auto repairs & maintenance" },
        { icon: Drill, name: "Handyman", description: "General repairs & fixes" },
        { icon: Lightbulb, name: "Appliance Repair", description: "Home appliance fixes" },
        { icon: Wrench, name: "HVAC", description: "Heating & cooling systems" },
      ]
    return(
        <section className="py-20 dark:bg-slate-900">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-foreground mb-4">Our Services</h2>
                    <p className="text-xl text-muted-foreground">Proffesional fixers for every need</p>
                </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-6 max-w-6xl mx-auto">
                {services.map((service, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer group">
                        <CardContent className="p-6 text-center">
                            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 dark:group-hover:bg-orange-900/50 transition-colors">
                            <service.icon className="h-6 w-6 text-orange-600 dark:text-orange-400"/></div>
                            <h3 className="font-bold text-foreground mb-2">{service.name}</h3>
                            <p className="text-muted-foreground text-sm mb-4">{service.description}</p>
                            <Button size="sm" style={{backgroundColor: "#FF8C42", backgroundImage: "linear-gradient(276.68deg, #FFB347 20.18%, #FF6B35 94.81%)"}} className="text-white font-bold hover:opacity-90">BOOK NOW</Button>
                        </CardContent>
                    </Card> 
                ))}
            </div>
        </section>
    )
}