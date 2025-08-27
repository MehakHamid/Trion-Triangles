"use client"

import { useState, useEffect } from "react"

type FAQ = {
  _id: string
  question: string
  answer: string
}

export default function FAQPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [question, setQuestion] = useState("")

  useEffect(() => {
    const fetchFaqs = async () => {
      const res = await fetch("/api/faq")
      const data: FAQ[] = await res.json()
      setFaqs(data)
    }
    fetchFaqs()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!question.trim()) return

    await fetch("/api/faq", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    })

    setQuestion("")
    alert("Your question has been submitted! Our team will respond soon.")
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-sky-50 to-indigo-50 px-6 py-12">
      <h1 className="text-3xl font-bold text-center text-indigo-700 mb-10">
        Frequently Asked Questions
      </h1>

      {/* Submit Question Form */}
      <section className="max-w-2xl mx-auto bg-white shadow-md rounded-xl p-6 mb-12">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Ask a Question
        </h2>
        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Type your question here..."
            className="flex-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-sky-500 transition"
          >
            Submit
          </button>
        </form>
      </section>

      {/* Published FAQs */}
      <section className="max-w-3xl mx-auto">
        {faqs.length === 0 ? (
          <p className="text-center text-gray-600">
            No FAQs published yet. Please check back soon.
          </p>
        ) : (
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq._id}
                className="bg-white shadow-sm rounded-lg p-5 border"
              >
                <h3 className="font-semibold text-indigo-700">{faq.question}</h3>
                <p className="text-gray-600 mt-2">{faq.answer}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
