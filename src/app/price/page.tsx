"use client"

import { useState, useEffect } from "react"
import type { Product } from "@/sanity/schemaTypes/price"

export default function PricingPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [expanded, setExpanded] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/products")
      const data: Product[] = await res.json()
      setProducts(data)
    }
    fetchData()
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-sky-50 to-indigo-50 px-6 py-12">
      <h1 className="text-3xl font-bold text-center text-indigo-700 mb-10">
        Pricing & Models
      </h1>

      <div className="max-w-5xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <div
            key={p._id}
            className="bg-white shadow-lg rounded-xl p-6 border hover:shadow-indigo-200 transition"
          >
            {/* Basic Info */}
            <h2 className="text-xl font-semibold text-indigo-700">{p.model}</h2>
            <p className="text-lg font-bold text-sky-600 mt-2">{p.rate}</p>

            {/* Toggle Button */}
            <button
              onClick={() => setExpanded(expanded === p._id ? null : p._id)}
              className="mt-4 text-sm text-white bg-indigo-600 px-4 py-2 rounded-lg hover:bg-sky-500 transition"
            >
              {expanded === p._id ? "Hide" : "More"}
            </button>

            {/* Expanded Details */}
            {expanded === p._id && (
              <div className="mt-4 text-gray-700 animate-fadeIn">
                <p className="mb-3">{p.description}</p>

                {/* Images */}
                <div className="flex gap-2 overflow-x-auto">
                  {p.images?.map((img, i) => (
                    <img
                      key={i}
                      src={img.url}
                      alt={p.model}
                      className="w-32 h-32 object-cover rounded-lg border"
                    />
                  ))}
                </div>

                {/* Specs */}
                <ul className="list-disc list-inside mt-4 text-sm text-gray-600">
                  {p.specs?.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  )
}
