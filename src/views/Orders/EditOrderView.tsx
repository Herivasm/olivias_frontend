import EditProductModal from "../../components/EditProductModal"
import EditOrderModal from "../../components/Orders/EditOrderModal";

interface EditOrderViewProps {
    onClose: () => void;
}

export default function EditOrderView({ onClose }: EditOrderViewProps) {
    return (
        <div>
            {/* Edit product modal content */}
            <EditOrderModal onClose={onClose} />
            {/* You can add more content here if needed */}
            <button onClick={onClose}></button>
        </div>
    )
}
