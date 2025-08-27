export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-r from-indigo-700 to-sky-600 text-white mt-12">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center">
        
        {/* Left Side - Copyright */}
        <p className="text-sm text-sky-100 text-center md:text-left">
          © {new Date().getFullYear()} Trion. All rights reserved.
        </p>

        {/* Right Side - Links */}
        <div className="flex flex-wrap justify-center md:justify-end gap-6 mt-4 md:mt-0 text-sm">
          <a href="/privacy" className="hover:text-yellow-300 transition">
            Privacy
          </a>
          <a href="/terms" className="hover:text-yellow-300 transition">
            Terms
          </a>
          <a href="/contact" className="hover:text-yellow-300 transition">
            Contact
          </a>
        </div>
      </div>
    </footer>
  )
}
