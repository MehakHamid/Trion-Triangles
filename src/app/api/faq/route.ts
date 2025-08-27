import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const body = await req.json()

  const doc = {
    _type: "faq",
    question: body.question,
    status: "pending",
  }

  const res = await fetch(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2023-01-01/data/mutate/production`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.SANITY_API_TOKEN}`, // Token with write access
      },
      body: JSON.stringify({ mutations: [{ create: doc }] }),
    }
  )

  const data = await res.json()
  return NextResponse.json(data)
}

export async function GET() {
  const query = `*[_type == "faq" && status == "published"]{
    _id,
    question,
    answer
  }`

  const res = await fetch(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2023-01-01/data/query/production?query=${encodeURIComponent(
      query
    )}`
  )

  const data = await res.json()
  return NextResponse.json(data.result || [])
}
