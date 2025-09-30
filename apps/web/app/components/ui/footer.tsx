import { Wrench, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Logo and Tagline */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1 text-orange-500">
                <Wrench className="h-6 w-6" />
                <MapPin className="h-4 w-4" />
              </div>
              <span className="text-xl font-bold">FixMate</span>
            </div>
            <p className="text-gray-400 max-w-sm">Trusted fixers, on-demand. Professional repair services across Nairobi.</p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <h3 className="font-bold text-lg mb-4 text-black dark:text-white">Quick Links</h3>
            <div className="space-y-3">
              <a href="#fixlist" className="block text-gray-400 hover:text-orange-400 transition-colors">
                FixList
              </a>
              <a href="#fixprotect" className="block text-gray-400 hover:text-orange-400 transition-colors">
                FixProtect
              </a>
              <a href="#careers" className="block text-gray-400 hover:text-orange-400 transition-colors">
                Careers
              </a>
              <a href="#contact" className="block text-gray-400 hover:text-orange-400 transition-colors">
                Contact
              </a>
            </div>
          </div>

          {/* Social Links */}
          <div className="md:col-span-1">
            <h3 className="font-bold text-lg mb-4 text-black dark:text-white">Follow Us</h3>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors p-2 hover:bg-gray-800 rounded-lg">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors p-2 hover:bg-gray-800 rounded-lg">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors p-2 hover:bg-gray-800 rounded-lg">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors p-2 hover:bg-gray-800 rounded-lg">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} FixMate. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
