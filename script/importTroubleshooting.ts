import fs from "fs"
import path from "path"
import { createClient } from "@sanity/client"
import * as dotenv from "dotenv"
import { fileURLToPath } from "url"

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") })

console.log("SANITY PROJECT ID:", process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)

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

async function importTroubleshooting() {
  try {
    const filePath = path.join(__dirname, "troubleshooting.json")
    const fileData = fs.readFileSync(filePath, "utf-8")
    const troubleshootingData = JSON.parse(fileData)

    for (const item of troubleshootingData) {
      await client.create({
        _type: "troubleshooting",
        issue: item.issue,
        description: item.description,
        solution: [
          {
            _type: "block",
            children: [{ _type: "span", text: item.solution }],
          },
        ],
        category: item.category || "other",
        status: item.status || "published",
      })
      console.log(`✅ Uploaded: ${item.issue}`)
    }

    console.log("🎉 All troubleshooting items imported successfully!")
  } catch (error) {
    console.error("❌ Import failed:", error)
  }
}

importTroubleshooting()
