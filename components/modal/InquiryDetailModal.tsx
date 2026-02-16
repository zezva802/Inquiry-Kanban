import { Inquiry } from "@/types/inquiry";

interface InquiryDetailModalProps{
    inquiry: Inquiry;
    onClose: () => void;
}

export function InquiryDetailModal({inquiry, onClose}: InquiryDetailModalProps){
    return(
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50"></div>
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-yellow-50 p-6 shadow-xl w-11/12 max-w-2xl">
                <h2>Inquiry Details for {inquiry.clientName}</h2>
                <button onClick={onClose}>Close</button>
                

                <div>Contact Person: {inquiry.contactPerson}</div>
                <div>Event Type: {inquiry.eventType}</div>
                <div>Event Date: {inquiry.eventDate}</div>
                <div>Guest Count: {inquiry.guestCount}</div>
                <div>Potential Value: {inquiry.potentialValue}</div>
                <div>Phase: {inquiry.phase}</div>
                <div>Hotels: {inquiry.hotels}</div>
                <div>Notes: {inquiry.notes ? inquiry.notes : "None"}</div>
                <div>Created At: {inquiry.createdAt}</div>
                <div>Updated: At: {inquiry.updatedAt}</div>
            </div>
        </>
    )
}