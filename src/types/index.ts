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

/** Orders */
export const orderStatusSchema = z.enum([
    "pending",
    "paid",
]);

export type OrderStatus = z.infer<typeof orderStatusSchema>

export const paymentMethodSchema = z.enum([
    "cash",
    "transaction"
]);

export type OrderPaymentMethod = z.infer<typeof paymentMethodSchema>;

export const orderItemSchema = z.object({
    _id: z.string(),
    product: productSchema,
    quantity: z.number(),
    unitPrice: z.number(),
});

export const orderSchema = z.object({
    _id: z.string(),
    orderNumber: z.string(),
    notes: z.string().optional(),
    total: z.number(),
    products: z.array(orderItemSchema),
    paymentMethod: paymentMethodSchema,
    status: orderStatusSchema,
    createdAt: z.string(),
    updatedAt: z.string(),
});

export const dashboardOrderSchema = z.array(
    orderSchema.pick({
        _id: true,
        orderNumber: true,
        total: true,
        status: true,
        createdAt: true,
        paymentMethod: true
    })
);

const orderProductFormSchema = z.object({
    product: z.string(),
    quantity: z.number().int().min(1, { message: 'La cantidad debe ser al menos 1.' }),
    unitPrice: z.number(),
});

export const orderFormSchema = z.object({
    notes: z.string().optional(),
    paymentMethod: paymentMethodSchema,
    status: orderStatusSchema,
    products: z.array(orderProductFormSchema).min(1, { message: 'La orden debe tener al menos un producto.' }),
});

export const createOrderSchema = orderFormSchema.omit({ status: true });
export type CreateOrderFormData = z.infer<typeof createOrderSchema>;

export const orderProductFormDataSchema = z.object({
    product: z.string(),
    quantity: z.number(),
    unitPrice: z.number(),
});

export const editOrderSchema = z.object({
    notes: z.string().optional(),
    paymentMethod: paymentMethodSchema,
    status: orderStatusSchema,
});
export type EditOrderFormData = z.infer<typeof orderFormSchema>;
export const orderFormDataSchema = z.object({
    notes: z.string().optional(),
    products: z.array(orderProductFormDataSchema),
    paymentMethod: paymentMethodSchema,
    status: orderStatusSchema
});

export const partialOrderFormDataSchema = orderFormDataSchema.partial();

export type Order = z.infer<typeof orderSchema>
export type OrderItem = z.infer<typeof orderItemSchema>
export type OrderFormData = z.infer<typeof orderFormDataSchema>
export type PartialOrderFormData = z.infer<typeof partialOrderFormDataSchema>;

/** Cash closing */
const salesSummarySchema = z.object({
    totalSales: z.number(),
    cashSales: z.number(),
    transactionSales: z.number(),
    orderCount: z.number(),
});

export const dailySalesReportSchema = z.object({
    summary: salesSummarySchema,
    orders: dashboardOrderSchema,
});

export type DailySalesReport = z.infer<typeof dailySalesReportSchema>;

export const cashClosingSchema = z.object({
    _id: z.string(),
    closingDate: z.string(),
    initialFund: z.number(),
    totalSales: z.number(),
    cashSales: z.number(),
    transactionSales: z.number(),
    expectedCashInBox: z.number(),
    finalBalance: z.number(),
    notes: z.string().optional(),
    createdAt: z.string(),
    updatedAt: z.string(),
});

export type CashClosing = z.infer<typeof cashClosingSchema>;

export const createCashClosingSchema = z.object({
    initialFund: z.number().min(0, 'El fondo inicial no puede ser negativo.'),
    closingDate: z.string(),
    notes: z.string().optional(),
});

export type CreateCashClosingFormData = z.infer<typeof createCashClosingSchema>;

/** Auth & User */
export const userSchema = z.object({
    _id: z.string(),
    name: z.string(),
    email: z.string().email(),
});

export const registerSchema = z.object({
    name: z.string().min(1, 'El nombre es obligatorio'),
    email: z.string().email('Email no válido'),
    password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
    password_confirmation: z.string()
}).refine(data => data.password === data.password_confirmation, {
    message: 'Las contraseñas no coinciden',
    path: ['password_confirmation']
});

export const loginSchema = z.object({
    email: z.string().email('Email no válido'),
    password: z.string().min(1, 'La contraseña es obligatoria')
});

export type User = z.infer<typeof userSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
