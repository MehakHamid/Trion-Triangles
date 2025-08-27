// /sanity/schemas/product.ts
import { defineType, defineField } from "sanity"

export default defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Connect Series", value: "connect-series" },
          { title: "Wise Series", value: "wise-series" },
          { title: "Wise Plus Series", value: "wise-plus-series" },
          { title: "Lux Power", value: "lux-power" },
          { title: "Flux", value: "flux" },
          { title: "Solplanet", value: "solplanet" },
          { title: "Dongin Battery", value: "dongin-battery" },
        ],
      },
    }),
    defineField({
      name: "model",
      title: "Model",
      type: "string",
    }),
    defineField({
      name: "capacity",
      title: "Capacity",
      type: "string",
    }),
    defineField({
      name: "load",
      title: "Load",
      type: "string",
    }),
    defineField({
      name: "specifications",
      title: "Specifications",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
    }),
  ],
})
