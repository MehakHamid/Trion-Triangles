"use client"
import { motion } from "framer-motion"
import Link from "next/link"

export default function HomePage() {
  return (
<main className="w-full min-h-screen bg-gradient-to-b from-white via-sky-50 to-indigo-50">
      
      {/* Hero Section */}
      <section className="w-full text-center py-20 bg-gradient-to-r from-indigo-700 to-sky-600 text-white shadow-md">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-extrabold"
        >
          Powering the Future with Trion
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-4 text-base md:text-lg text-sky-100 max-w-3xl mx-auto"
        >
          Advanced Hybrid, On-Grid & Off-Grid Solar Inverters with Smart Lithium Battery Solutions.
        </motion.p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <Link
            href="/products"
            className="px-6 py-3 bg-white text-indigo-700 font-medium rounded-xl shadow hover:bg-sky-50 transition"
          >
            Explore Products
          </Link>
          <Link
            href="/contact"
            className="px-6 py-3 bg-sky-500 hover:bg-sky-400 text-white font-medium rounded-xl shadow transition"
          >
            Get in Touch
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose Trion?
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              {
                title: "Hybrid Technology",
                desc: "Seamlessly switch between solar, battery, and grid for uninterrupted power.",
              },
              {
                title: "Smart Lithium Batteries",
                desc: "Long-lasting, safe, and efficient energy storage for homes & businesses.",
              },
              {
                title: "24/7 Support",
                desc: "Dedicated customer support team to assist with setup & troubleshooting.",
              },
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className="bg-white shadow-lg rounded-2xl p-6 text-center hover:shadow-indigo-200 transition"
              >
                <h3 className="text-xl font-semibold text-indigo-700">{f.title}</h3>
                <p className="text-gray-600 mt-3">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="w-full py-16 bg-gradient-to-b from-indigo-50 to-sky-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Our Product Range
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              "Connect Series",
              "Wise Series",
              "Wise Plus Series",
              "Lux Power",
              "Flux",
              "Solplanet",
              "Dongin Battery",
            ].map((p, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-indigo-200 transition"
              >
                <h3 className="text-lg font-semibold text-indigo-700">{p}</h3>
                <Link
                  href={`/products/${p.toLowerCase().replace(/ /g, "-")}`}
                  className="mt-2 inline-block text-sm text-sky-600 hover:underline"
                >
                  Learn More →
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="w-full py-20 bg-gradient-to-r from-sky-600 to-indigo-700 text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold">
          Ready to Go Solar with Trion?
        </h2>
        <p className="mt-4 text-sky-100 max-w-xl mx-auto">
          Contact our experts today to find the perfect inverter & battery solution for your needs.
        </p>
        <div className="mt-6">
          <Link
            href="/contact"
            className="px-6 py-3 bg-white text-indigo-700 font-medium rounded-xl shadow hover:bg-sky-50 transition"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </main>
  )
}
