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
    cost: z.number(),
    description: z.string(),
    photoUrl: z.string().url().optional(),
    category: productCategorySchema,
    createdAt: z.string(),
    updatedAt: z.string(),
})

export const productFormDataSchema = productSchema.omit({
    _id: true,
    createdAt: true,
    updatedAt: true,
});

export const dashboardProductSchema = z.array(productSchema)

export type Product = z.infer<typeof productSchema>
export type ProductFormData = z.infer<typeof productFormDataSchema>

/** SUPPLIES */

