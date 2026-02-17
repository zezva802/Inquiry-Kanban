import { Inquiry } from "@/types/inquiry";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

interface InquiryCardProps{
    inquiry: Inquiry;
    handleOpenModal: (inquiry: Inquiry) => void;
}

export function InquiryCard({inquiry, handleOpenModal}: InquiryCardProps){

    const { setNodeRef, attributes, listeners, transform } = useDraggable({id: inquiry.id});

    const style = {
        transform: CSS.Translate.toString(transform)
    }

    return(
        <div style={style} ref={setNodeRef} {...listeners} {...attributes} className="bg-yellow-50 p-3 shadow-sm mb-3" onClick={() => {handleOpenModal(inquiry)}}>
            <p>Client name: {inquiry.clientName}</p>
            <p>Event date: {inquiry.eventDate}</p>
            <p>Guest count: {inquiry.guestCount}</p>
            <p>Potential value: {inquiry.potentialValue}CHF</p>
        </div>
    )
}