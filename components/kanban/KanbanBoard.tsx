import { KanbanColumn } from "./KanbanColumn";
import { mockInquiries } from "@/lib/mockData";

export function KanbanBoard(){

    return (
        <div className="flex">
            <KanbanColumn title="New Inquiries" phase="new" inquiries={mockInquiries.filter(i => i.phase === "new")}></KanbanColumn>
            <KanbanColumn title="Sent to Hotels" phase="sent_to_hotels" inquiries={mockInquiries.filter(i => i.phase === "sent_to_hotels")}></KanbanColumn>
            <KanbanColumn title="Received offers" phase="offers_received" inquiries={mockInquiries.filter(i => i.phase === "offers_received")}></KanbanColumn>
            <KanbanColumn title="Completed" phase="completed" inquiries={mockInquiries.filter(i => i.phase === "completed")}></KanbanColumn>
        </div>
    )
}