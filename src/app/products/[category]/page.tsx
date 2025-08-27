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
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold capitalize text-slate-800 mb-10 border-b-2 border-sky-500 inline-block pb-2">
        {params.category.replace("-", " ")}
      </h1>

      {data.length === 0 ? (
        <p className="text-slate-600">No products found in this category.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((item: any) => (
            <div
              key={item._id}
              className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-1"
            >
              {item.image && (
                <Image
                  src={item.image.asset.url}
                  alt={item.model}
                  width={400}
                  height={250}
                  className="w-full h-52 object-cover"
                />
              )}
              <div className="p-5">
                <h2 className="text-xl font-semibold text-slate-800">
                  {item.model}
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  Capacity: {item.capacity} | Load: {item.load}
                </p>
                <p className="text-lg font-bold text-sky-600 mt-2">
                  ${item.price}
                </p>

                <Link
                  href={`/products/${params.category}/${item._id}`}
                  className="mt-4 inline-block bg-sky-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-sky-700 transition"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
