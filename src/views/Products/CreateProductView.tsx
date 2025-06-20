import { useNavigate } from "react-router-dom"
import type { ProductCategory, ProductFormData } from "../../types"
import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import { createProduct } from "../../api/ProductAPI"
import { toast } from "react-toastify"
import CreateProductModal from "../../components/Products/CreateProductModal"

interface CreateProductViewProps {
    onClose: () => void;
}

export default function CreateProductView({ onClose }: CreateProductViewProps) {
    // const navigate = useNavigate()
    // const initialValues: ProductFormData = {
    //     productName: "",
    //     price: 0,
    //     description: "",
    //     category: "" as ProductCategory,
    //     imageUrl: ""
    // }

    // const { register, handleSubmit, formState } = useForm({ defaultValues: initialValues })

    // const { mutate } = useMutation({
    //     mutationFn: createProduct,
    //     onError: (error) => {
    //         toast.error(error.message)
    //     },
    //     onSuccess: (data) => {
    //         toast.success(data)
    //         navigate('/')
    //     }
    // })

    // const handleForm = (formData: ProductFormData) => mutate(formData)

    return (
        <>
            <CreateProductModal onClose={onClose} />
        </>
    )
}
