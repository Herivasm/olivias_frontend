import EditSuppliesModal from "../../components/Supplies/EditSuppliesModal";
import { type Supply } from "../../api/SuppliesAPI";

interface EditSuppliesProps {
    onClose: () => void;
    supply: Supply;
    onSuccess: () => void;
}

export default function EditSuppliesView({ onClose, supply, onSuccess }: EditSuppliesProps) {
    return (
        <div>
            <EditSuppliesModal 
                onClose={onClose} 
                supply={supply}
                onSuccess={onSuccess}
            />
        </div>
    )
}