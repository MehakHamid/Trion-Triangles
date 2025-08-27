import { NextResponse } from "next/server"

export async function GET() {
  const query = `*[_type == "troubleshooting" && status == "published"]{
    _id,
    issue,
    description,
    solution,
    category
  }`

  const res = await fetch(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2023-01-01/data/query/production?query=${encodeURIComponent(
      query
    )}`
  )

  const data = await res.json()
  return NextResponse.json(data.result || [])
}
