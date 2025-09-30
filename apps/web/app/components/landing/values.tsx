import { BriefcaseBusiness, Zap } from "lucide-react"
import { SiTrustedshops } from "react-icons/si"
import { VscWorkspaceTrusted } from "react-icons/vsc"

export function Values(){
    const values = [
        {icon: Zap , name: "Instant", description: "Instant service delivery" },
        {icon: VscWorkspaceTrusted , name: "Trusted", description: "Trusted by thousands of customers" },
        {icon: BriefcaseBusiness , name: "Reliable" , description: "Reliable and trustworthy" },
    ]
    return(
        <section className="py-20 bg-background dark:bg-gray-900">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-foreground mb-4">Our Values</h2>
                    {/* <p className="text-xl text-muted-foreground">Proffesional fixers for every need</p> */}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {values.map((value, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mb-4">
                                <value.icon className="h-8 w-8 text-orange-600 dark:text-orange-400"/>
                            </div>
                            <h3 className="font-bold text-foreground mb-2">{value.name}</h3>
                            <p className="text-muted-foreground text-sm text-center">{value.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )

}