import fs from "fs"
import path from "path"
import { createClient } from "@sanity/client"
import * as dotenv from "dotenv"
import { fileURLToPath } from "url"

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") })

// ESM fix
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2023-01-01",
  token: process.env.SANITY_API_TOKEN!,
  useCdn: false,
})

async function importFaq() {
  try {
    const filePath = path.join(__dirname, "faq.json")
    const fileData = fs.readFileSync(filePath, "utf-8")
    const faqData = JSON.parse(fileData)

    for (const item of faqData) {
      await client.create({
        _type: "faq",
        question: item.question,
        answer: item.answer,
        status: item.status || "published",
      })
      console.log(`✅ Uploaded: ${item.question}`)
    }

    console.log("🎉 All FAQs imported successfully!")
  } catch (error) {
    console.error("❌ Import failed:", error)
  }
}

importFaq()
