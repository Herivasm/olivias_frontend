import EditSupplersModal from "../../components/EditSupplersModal";

interface EditSupplersProps {
    onClose: () => void;
}

export default function EditProductView({ onClose }:  EditSupplersProps) {
    return (
        <div>
            {/* Edit Supplers modal content */}
            <EditSupplersModal onClose={onClose} />
            {/* You can add more content here if needed */}
            <button onClick={onClose}></button>
        </div>
    )
}
