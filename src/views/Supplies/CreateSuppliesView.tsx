import CreateSuppliesModal from "../../components/Supplies/CreateSuppliesModal"

interface CreateSuppliesViewProps {
    onClose: () => void;
    onSuccess: () => void;
}

export default function CreateSuppliesView({ onClose, onSuccess }: CreateSuppliesViewProps ) {
    return (
        <>
            <CreateSuppliesModal 
                onClose={onClose} 
                onSuccess={onSuccess} 
            />
        </>
    )
}