import { Inquiry, InquiryPhase } from "@/types/inquiry";
import { InquiryCard } from "./InquiryCard";

interface KanbanColumnProps {
    title: string;
    phase: InquiryPhase;
    inquiries: Inquiry[];
}

export function KanbanColumn({ title, phase, inquiries}: KanbanColumnProps){
    return(
        <div className="w-80 bg-white p-4 rounded-lg mx-2 min-h-screen">
            {title}
            {inquiries.map((inquiry) => (
                <InquiryCard key={inquiry.id} inquiry={inquiry}/>
            ))}
        </div>
    )
}