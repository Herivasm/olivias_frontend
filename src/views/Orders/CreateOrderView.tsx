import CreateOrderModal from "../../components/Orders/CreateOrderModal";

interface CreateOrderModalProps {
    onClose: () => void;
}

export default function CreateOrderView({ onClose }: CreateOrderModalProps){
    return(
        <>
            <CreateOrderModal onClose={onClose}/>
        </>
    );
}