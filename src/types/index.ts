import { z } from "zod";

/** Products */
export const productCategorySchema = z.enum(["hotDrink", "coldDrink", "dish", "dessert"])
export type ProductCategory = z.infer<typeof productCategorySchema>

export const productSchema = z.object({
    _id: z.string(),
    productName: z.string(),
    price: z.number(),
    description: z.string(),
    imageUrl: z.string(),
    category: productCategorySchema,
})

export const dashboardProductSchema = z.array(
    productSchema.pick({
        _id: true,
        productName: true,
        price: true,
        description: true,
        imageUrl: true,
        category: true,
    })
)

export type Product = z.infer<typeof productSchema>
export type ProductFormData = Pick<Product, 'productName' | 'price' | 'description' | 'category' | 'imageUrl'>

