export const searchQuery = `
  *[
    name match $term || 
    title match $term || 
    issue match $term
  ]{
    _id,
    _type,
    name,
    title,
    issue,
    "slug": slug.current
  }
`
