import CreateSuppliersModal from "../../components/Suppliers/CreateSuppliersModal"

// --- MODIFICACIÓN 1: Añadir 'onSuccess' a las props ---
interface CreateSuppliersViewProps {
    onClose: () => void;
    onSuccess: () => void;
}

export default function CreateSuppliersView({ onClose, onSuccess }: CreateSuppliersViewProps) {
    return (
        <>
            {/* --- MODIFICACIÓN 2: Pasar 'onSuccess' al modal --- */}
            <CreateSuppliersModal 
                onClose={onClose} 
                onSuccess={onSuccess}
            />
        </>
    )
}