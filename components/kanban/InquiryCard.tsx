import { Inquiry } from "@/types/inquiry";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

interface InquiryCardProps{
    inquiry: Inquiry;
    handleOpenModal: (inquiry: Inquiry) => void;
}

function formatRelativeDate(dateString: string): string {
    const date = new Date(dateString)
    const now = new Date()
    const diffDays = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

    if(diffDays < 0) return `${Math.abs(diffDays)} days ago`
    if(diffDays === 0) return 'Today'
    return `in ${diffDays} days`
}

export function InquiryCard({inquiry, handleOpenModal}: InquiryCardProps){

    const { setNodeRef, attributes, listeners, transform, isDragging } = useDraggable({id: inquiry.id});

    const style = {
        transform: CSS.Translate.toString(transform)
    }
    const isHighValue = inquiry.potentialValue > 50000;

    return(
        <div style={style} ref={setNodeRef} {...listeners} {...attributes} onClick={() => handleOpenModal(inquiry)}
        className={`relative cursor-pointer group bg-white rounded-xl border-2 border-gray-400 p-4 mb-3 shadow-sm hover:shadow-md transition-all duration-100 hover:-translate-y-0.5
            ${isHighValue ? "border-l-4 border-l-yellow-400" : ""} 
            ${isDragging ? "opacity-100 scale-105 shadow-lg z-10" : ""}`}
        >
            {isHighValue && (
                <span className="text-xs font-medium text-yellow-600">⭐ High Value</span>
            )}
            <h3 className="font-semibold text-gray-900 text-sm">{inquiry.clientName}</h3>
            <p className="text-xs text-gray-500 mt-1">📅 {formatRelativeDate(inquiry.eventDate)}</p>
            <div className="flex justify-between mt-3 text-sm">
                <span className="text-gray-500">👥 {inquiry.guestCount}</span>
                <span className="font-medium">{new Intl.NumberFormat("de-CH").format(inquiry.potentialValue)} CHF</span>
            </div>
        </div>
    )
}