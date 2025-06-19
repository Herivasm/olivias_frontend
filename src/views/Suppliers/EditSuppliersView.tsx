import EditSuppliersModal from "../../components/Suppliers/EditSuppliersModal";

interface EditSuppliersProps {
    onClose: () => void;
}

export default function EditSuppliersView({ onClose }:  EditSuppliersProps) {
    return (
        <div>
            {/* Edit Supplers modal content */}
            <EditSuppliersModal onClose={onClose} />
            {/* You can add more content here if needed */}
            <button onClick={onClose}></button>
        </div>
    )
}
