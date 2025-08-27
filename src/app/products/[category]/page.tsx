import { client } from "@/sanity/lib/client"
import Image from "next/image"
import Link from "next/link"

export const revalidate = 60

export default async function CategoryPage({
  params,
}: {
  params: { category: string }
}) {
  const data = await client.fetch(
    `*[_type=="product" && category==$category]{
      _id, model, capacity, load, image, price
    }`,
    { category: params.category }
  )

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold capitalize mb-8">
        {params.category.replace("-", " ")}
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {data.map((item: any) => (
          <div
            key={item._id}
            className="bg-white shadow rounded-xl p-4 hover:shadow-lg transition"
          >
            {item.image && (
              <Image
                src={item.image.asset.url}
                alt={item.model}
                width={400}
                height={300}
                className="rounded-lg"
              />
            )}
            <h2 className="text-lg font-semibold mt-2">{item.model}</h2>
            <p className="text-sm text-slate-600">
              Capacity: {item.capacity} | Load: {item.load}
            </p>
            <p className="font-bold text-sky-600 mt-1">${item.price}</p>

            <Link
              href={`/products/${params.category}/${item._id}`}
              className="inline-block mt-3 text-sm text-white bg-sky-600 px-4 py-2 rounded-lg hover:bg-sky-700 transition"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
