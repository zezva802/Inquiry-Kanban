import { InquiryPhase } from "@/types/inquiry";

interface KanbanColumnProps {
    title: string;
    phase: InquiryPhase;
}

export function KanbanColumn({ title, phase}: KanbanColumnProps){
    return(
        <div className="w-80 bg-white p-4 rounded-lg mx-2 min-h-screen">
            {title}
        </div>
    )
}