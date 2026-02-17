import { Inquiry } from "@/types/inquiry";
import { useInquiryStore } from "@/store/inquiryStore";

interface InquiryDetailModalProps{
    inquiry: Inquiry;
}

export function InquiryDetailModal({inquiry}: InquiryDetailModalProps){
    const {closeModal} = useInquiryStore();
    return(
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50"></div>
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-yellow-50 p-6 shadow-xl w-11/12 max-w-2xl">
                <header className="text-2xl font-bold text-gray-800 flex justify-between items-start">
                    <h2>Inquiry Details for {inquiry.clientName}</h2>
                    <button onClick={closeModal}>Close</button>
                </header>
                
                <div className="mt-4 grid grid-cols-2 gap-y-2 gap-x-4">
                    <div><p className="font-semibold">Contact Person: </p>{inquiry.contactPerson}</div>
                    <div><p className="font-semibold">Event Type: </p>{inquiry.eventType}</div>
                    <div><p className="font-semibold">Event Date: </p>{inquiry.eventDate}</div>
                    <div><p className="font-semibold">Guest Count: </p>{inquiry.guestCount}</div>
                    <div><p className="font-semibold">Potential Value: </p>{inquiry.potentialValue}</div>
                    <div><p className="font-semibold">Phase: </p>{inquiry.phase}</div>
                    <div><p className="font-semibold">Hotels: </p>{inquiry.hotels.join(', ')}</div>
                    <div className="border-t pt-3 mt-3"><p className="font-semibold">Notes: </p>{inquiry.notes ? inquiry.notes : "None"}</div>
                    <div><p className="font-semibold">Created At: </p>{new Date(inquiry.createdAt).toLocaleString()}</div>
                    <div><p className="font-semibold">Updated At: </p>{new Date(inquiry.updatedAt).toLocaleString()}</div>
                </div>
            </div>
        </>
    )
}