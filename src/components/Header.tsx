"use client"
import Link from "next/link"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ChevronDown, Search } from "lucide-react"
import { client } from "@/sanity/lib/client"
import { searchQuery } from "@/sanity/lib/queries"

const navItems = [
  { name: "Home", href: "/" },
  { name: "Contact", href: "/contact" },
  {
    name: "Product",
    dropdown: [
      { name: "Connect Series", href: "/products/connect-series" },
      { name: "Wise Series", href: "/products/wise-series" },
      { name: "Wise Plus Series", href: "/products/wise-plus-series" },
      { name: "Lux Power", href: "/products/lux-power" },
      { name: "Flux", href: "/products/flux" },
      { name: "Solplanet", href: "/products/solplanet" },
      { name: "Dongin Battery", href: "/products/dongin-battery" },
    ],
  },
  { name: "Troubleshooting", href: "/troubleshooting/slug" },
  { name: "Price", href: "/price" },
  { name: "FAQ", href: "/FAQ/slug" },
]

// sanity _type -> route mapping
const typeToRoute: Record<string, string> = {
  product: "products",
  troubleshooting: "troubleshooting",
  faq: "faq",
}

export default function Header() {
  const [active, setActive] = useState("/")
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<any[]>([])

  // search handle function
  useEffect(() => {
    const fetchResults = async () => {
      if (query.length < 2) {
        setResults([])
        return
      }
      const data = await client.fetch(searchQuery, { term: `*${query}*` })
      setResults(data)
    }
    fetchResults()
  }, [query])

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-sky-600">
          Trion
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 text-sm font-medium items-center relative">
          {navItems.map((item) =>
            item.dropdown ? (
              <div key={item.name} className="relative group">
                <button className="flex items-center gap-1 text-slate-700 hover:text-sky-600 transition">
                  {item.name} <ChevronDown size={16} />
                </button>

                {/* Dropdown */}
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 mt-3 bg-white shadow-lg rounded-xl overflow-hidden w-56 
                             opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-slate-100"
                >
                  {item.dropdown.map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-sky-50 hover:text-sky-600 transition"
                    >
                      {sub.name}
                    </Link>
                  ))}
                </motion.div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setActive(item.href)}
                className={`relative transition-colors px-1 ${
                  active === item.href
                    ? "text-sky-600"
                    : "text-slate-700 hover:text-sky-600"
                }`}
              >
                {item.name}
                {active === item.href && (
                  <motion.div
                    layoutId="underline"
                    className="absolute left-0 -bottom-1 h-[2px] w-full bg-sky-600 rounded"
                  />
                )}
              </Link>
            )
          )}

          {/* Search */}
          <div className="relative">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-full hover:bg-sky-50 transition"
            >
              <Search className="w-5 h-5 text-slate-700" />
            </button>

            {searchOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white shadow-lg rounded-xl p-4 border border-slate-100">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search here..."
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 text-slate-800 placeholder-slate-400"
                />

                <div className="mt-2 max-h-60 overflow-y-auto">
                  {results.length > 0 ? (
                    results.map((item) => (
                      <Link
                        key={item._id}
                        href={`/${typeToRoute[item._type]}/${item.slug?.current || item._id}`}
                        className="block px-2 py-1 text-sm text-slate-700 hover:bg-sky-50 hover:text-sky-600 rounded transition"
                      >
                        {item.name || item.title || item.issue}
                      </Link>
                    ))
                  ) : (
                    <p className="text-sm text-slate-500">No results found.</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}
