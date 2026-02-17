import { Inquiry, InquiryPhase } from "@/types/inquiry";
import { useInquiryStore } from "@/store/inquiryStore";

interface InquiryDetailModalProps{
    inquiry: Inquiry;
}

export function InquiryDetailModal({inquiry}: InquiryDetailModalProps){
    const {closeModal, updatePhase} = useInquiryStore();
    const formattedValue = new Intl.NumberFormat('de-CH').format(inquiry.potentialValue);
    return(
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-20"></div>
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-yellow-50 p-6 shadow-xl w-11/12 max-w-2xl z-30">
                <header className="text-2xl font-bold text-gray-800 flex justify-between items-start">
                    <h2>Inquiry Details for {inquiry.clientName}</h2>
                    <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 text-xxl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100">x</button>
                </header>
                
                <div className="mt-4 grid grid-cols-2 gap-y-2 gap-x-4">
                    <div className="flex flex-col gap-1"><p className="text-xs text-gray-700 font-medium uppercase tracking-wide">Contact Person: </p>{inquiry.contactPerson}</div>
                    <div className="flex flex-col gap-1"><p className="text-xs text-gray-700 font-medium uppercase tracking-wide">Event Type: </p>{inquiry.eventType}</div>
                    <div className="flex flex-col gap-1"><p className="text-xs text-gray-700 font-medium uppercase tracking-wide">Event Date: </p>{inquiry.eventDate}</div>
                    <div className="flex flex-col gap-1"><p className="text-xs text-gray-700 font-medium uppercase tracking-wide">Guest Count: </p>{inquiry.guestCount}</div>
                    <div className="flex flex-col gap-1"><p className="text-xs text-gray-700 font-medium uppercase tracking-wide">Potential Value: </p>{formattedValue} CHF</div>
                    <div className="flex flex-col gap-1"><p className="text-xs text-gray-700 font-medium uppercase tracking-wide">Change Phase:</p>
                        <select className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm mt-1"
                        value={inquiry.phase}
                        onChange={(e) => updatePhase(inquiry.id, e.target.value as InquiryPhase)}
                        >
                            <option value="new">New</option>
                            <option value="sent_to_hotels">Sent to Hotels</option>
                            <option value="offers_received">Offers Received</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-1"><p className="text-xs text-gray-700 font-medium uppercase tracking-wide">Hotels: </p>
                        {inquiry.hotels.map(hotel => (
                            <span key={hotel} className="text-xs bg-gray-300 px-2 py-1 rounded-full mr-1">
                                {hotel}
                            </span>
                        ))}
                    </div>
                    <div className="flex flex-col gap-1 border-t-2 border-gray-500 pt-3 mt-3 col-span-2"><p className="text-xs text-gray-700 font-medium uppercase tracking-wide">Notes: </p>{inquiry.notes ? inquiry.notes : "None"}</div>
                    <div className="flex flex-col gap-1"><p className="text-xs text-gray-700 font-medium uppercase tracking-wide">Created At: </p>{new Date(inquiry.createdAt).toLocaleString()}</div>
                    <div className="flex flex-col gap-1"><p className="text-xs text-gray-700 font-medium uppercase tracking-wide">Updated At: </p>{new Date(inquiry.updatedAt).toLocaleString()}</div>
                </div>
            </div>
        </>
    )
}