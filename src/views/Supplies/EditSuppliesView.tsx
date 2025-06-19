import EditSuppliesModal from "../../components/Supplies/EditSuppliesModal";

interface EditSuppliesProps {
    onClose: () => void;
}

export default function EditSuppliesView({ onClose }:  EditSuppliesProps) {
    return (
        <div>
            {/* Edit Supplers modal content */}
            <EditSuppliesModal onClose={onClose} />
            {/* You can add more content here if needed */}
            <button onClick={onClose}></button>
        </div>
    )
}
