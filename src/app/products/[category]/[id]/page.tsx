import { client } from "@/sanity/lib/client"
import Image from "next/image"

export const revalidate = 60

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const product = await client.fetch(
    `*[_type=="product" && _id==$id][0]{
      model, capacity, load, specifications, description, image, price
    }`,
    { id: params.id }
  )

  if (!product) {
    return <div className="p-12 text-center text-slate-600">Product not found</div>
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="grid md:grid-cols-2 gap-10 items-start">
        {product.image && (
          <Image
            src={product.image.asset.url}
            alt={product.model}
            width={600}
            height={400}
            className="rounded-2xl shadow-md"
          />
        )}

        <div>
          <h1 className="text-3xl font-bold text-slate-800">{product.model}</h1>
          <p className="text-slate-600 mt-2">{product.description}</p>

          <div className="mt-6">
            <h2 className="font-semibold text-lg text-slate-800">Specifications:</h2>
            <ul className="list-disc list-inside text-slate-700 space-y-1 mt-2">
              {product.specifications?.map((spec: string, idx: number) => (
                <li key={idx}>{spec}</li>
              ))}
            </ul>
          </div>

          <div className="mt-6 space-y-1">
            <p>
              <strong>Capacity:</strong> {product.capacity}
            </p>
            <p>
              <strong>Load:</strong> {product.load}
            </p>
            <p className="text-2xl font-bold text-sky-600 mt-3">
              Price: ${product.price}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
