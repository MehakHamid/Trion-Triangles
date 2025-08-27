import { defineType, defineField } from "sanity"

const troubleshooting = defineType({
  name: "troubleshooting",
  title: "Troubleshooting",
  type: "document",
  fields: [
    defineField({
      name: "errorCode",
      title: "Error Code",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
       defineField({
      name: "slug",
      title: "slug",
      type: "slug",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "issue",
      title: "Issue",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description (Alarm / Event)",
      type: "text",
    }),
    defineField({
      name: "solution",
      title: "Solution",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Battery", value: "battery" },
          { title: "Inverter", value: "inverter" },
          { title: "Solar Panel", value: "solar" },
          { title: "Other", value: "other" },
        ],
      },
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Draft", value: "draft" },
          { title: "Published", value: "published" },
        ],
        layout: "radio",
      },
      initialValue: "published",
    }),
  ],
})

export default troubleshooting
