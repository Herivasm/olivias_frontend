import { z } from "zod";

/** Products */
export const productCategorySchema = z.enum([
  "hotDrinks",
  "coldDrinks",
  "alcohol",
  "snacks",
  "hamburguers",
  "baguettes",
  "sandwiches",
  "desserts",
])

export type ProductCategory = z.infer<typeof productCategorySchema>

export const productSchema = z.object({
    _id: z.string(),
    productName: z.string(),
    price: z.number(),
    cost: z.number(), // ¡también falta esto!
    description: z.string(),
    photoUrl: z.string().url().optional(),
    category: productCategorySchema,
})

export const dashboardProductSchema = z.array(
    productSchema.pick({
        _id: true,
        productName: true,
        price: true,
        cost: true,
        description: true,
        photoUrl: true,
        category: true,
    })
)

export type Product = z.infer<typeof productSchema>
export type ProductFormData = Pick<Product, 'productName' | 'price' | 'cost' | 'description' | 'category' | 'photoUrl'>

/** SUPPLIES */

