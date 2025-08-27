import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();

  const mutation = {
    mutations: [
      {
        create: {
          _type: "contact",
          name: data.name,
          contact: data.contact,
          email: data.email,
          message: data.message,
          createdAt: new Date().toISOString(),
        },
      },
    ],
  };

  try {
    const res = await fetch(
      `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.SANITY_API_TOKEN}`, // token required
        },
        body: JSON.stringify(mutation),
      }
    );

    const json = await res.json();

    console.log("Sanity response:", json); // 👈 yaha dekhna zaroori hai

    return NextResponse.json(json);
  } catch (err) {
    console.error("Sanity error:", err);
    return NextResponse.json({ error: "Error saving message" }, { status: 500 });
  }
}
console.log("Project ID:", process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
console.log("Dataset:", process.env.NEXT_PUBLIC_SANITY_DATASET);
console.log("Token set:", !!process.env.SANITY_API_TOKEN); 