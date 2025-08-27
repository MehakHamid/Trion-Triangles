import { type SchemaTypeDefinition } from 'sanity'
import {contact }from './contact'
import product from './product'
import faq from './faq'
import troubleshooting from './troubleshooting'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [contact, product,faq, troubleshooting],
}
