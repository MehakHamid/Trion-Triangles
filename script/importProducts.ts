// /script/importProducts.ts
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

async function importProducts() {
  try {
    const filePath = path.join(__dirname, "products.json")
    const fileData = fs.readFileSync(filePath, "utf-8")
    const products = JSON.parse(fileData)

    for (const product of products) {
      await client.create({
        _type: "product",
        category: product.category,
        model: product.model,
        capacity: product.capacity,
        load: product.load,
        specifications: product.specifications,
        description: product.description,
        price: product.price,
      })
      console.log(`✅ Uploaded: ${product.model}`)
    }

    console.log("🎉 All products imported successfully!")
  } catch (error) {
    console.error("❌ Import failed:", error)
  }
}

importProducts()
