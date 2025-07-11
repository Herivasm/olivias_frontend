import EditSuppliersModal from "../../components/Suppliers/EditSuppliersModal";
import type { Supplier } from "../../api/SuppliersAPI";

interface EditSuppliersProps {
    onClose: () => void;
    supplier: Supplier;
    onSuccess: () => void;
}

export default function EditSuppliersView({ onClose, supplier, onSuccess }: EditSuppliersProps) {
    return (
        <EditSuppliersModal 
            onClose={onClose} 
            supplier={supplier}
            onSuccess={onSuccess}
        />
    );
}