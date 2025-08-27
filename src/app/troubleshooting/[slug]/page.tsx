"use client"

import { useEffect, useState } from "react"

type Troubleshooting = {
  _id: string
  issue: string
  description?: string
  solution?: any
  category?: string
}

export default function TroubleshootingPage() {
  const [items, setItems] = useState<Troubleshooting[]>([])
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/troubleshooting")
      const data: Troubleshooting[] = await res.json()
      setItems(data)
    }
    fetchData()
  }, [])

  const filteredItems = items.filter(
    (item) =>
      (filter === "all" || item.category === filter) &&
      (item.issue.toLowerCase().includes(search.toLowerCase()) ||
        item.solution
          ?.map((block: any) =>
            block.children ? block.children.map((c: any) => c.text).join(" ") : ""
          )
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase()))
  )

  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-sky-50 py-12">
      {/* Heading */}
      <h1 className="text-4xl font-extrabold text-center text-indigo-700 mb-12 drop-shadow-sm">
        ⚡ Troubleshooting Guide
      </h1>

      {/* Search & Filter */}
      <div className="w-full px-6 md:px-12 mb-10 flex flex-col md:flex-row gap-4 justify-between items-center">
        <input
          type="text"
          placeholder="🔍 Search error code or issue..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm 
             focus:ring-2 focus:ring-indigo-500 outline-none
             text-gray-800 placeholder-gray-500"        />

      </div>

      {/* Results */}
      {filteredItems.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          ❌ No troubleshooting results found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 md:px-12 w-full">
          {filteredItems.map((item) => (
            <div
              key={item._id}
              className="bg-white shadow-md hover:shadow-lg rounded-xl border border-slate-200 transition-all p-6"
            >
              <h2 className="text-lg font-semibold text-indigo-600">
                {item.issue}
              </h2>
              {item.category && (
                <p className="text-sm text-gray-500 mb-2">
                  Category: {item.category}
                </p>
              )}
              {item.solution && (
                <div className="mt-3">
                  <h3 className="font-semibold text-gray-800">✅ Solution:</h3>
                  <p className="text-sm text-gray-700 mt-1 whitespace-pre-wrap">
                    {item.solution
                      .map((block: any) =>
                        block.children
                          ? block.children.map((c: any) => c.text).join(" ")
                          : ""
                      )
                      .join("\n")}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
