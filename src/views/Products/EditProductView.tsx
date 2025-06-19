import EditProductModal from "../../components/Products/EditProductModal"

interface EditProductViewProps {
    onClose: () => void;
}

export default function EditProductView({ onClose }: EditProductViewProps) {
    return (
        <div>
            {/* Edit product modal content */}
            <EditProductModal onClose={onClose} />
            {/* You can add more content here if needed */}
            <button onClick={onClose}></button>
        </div>
    )
}
