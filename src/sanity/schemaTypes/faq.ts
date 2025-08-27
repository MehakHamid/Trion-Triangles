import { defineType, defineField } from "sanity"

export default defineType({
  name: "faq",
  title: "FAQs",
  type: "document",
  fields: [
    defineField({
      name: "question",
      title: "Question",
      type: "string",
    }),
     defineField({
      name: "slug",
      title: "slug",
      type: "slug",
    }),
    defineField({
      name: "answer",
      title: "Answer",
      type: "text",
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "Published", value: "published" },
        ],
        layout: "radio",
      },
      initialValue: "pending",
    }),
  ],
})
