import { Inquiry } from "@/types/inquiry";

interface InquiryCardProps{
    inquiry: Inquiry;
    handleOpenModal: (inquiry: Inquiry) => void;
}

export function InquiryCard({inquiry, handleOpenModal}: InquiryCardProps){
    return(
        <div className="bg-yellow-50 p-3 shadow-sm mb-3" onClick={() => {handleOpenModal(inquiry)}}>
            <p>Client name: {inquiry.clientName}</p>
            <p>Event date: {inquiry.eventDate}</p>
            <p>Guest count: {inquiry.guestCount}</p>
            <p>Potential value: {inquiry.potentialValue}CHF</p>
        </div>
    )
}