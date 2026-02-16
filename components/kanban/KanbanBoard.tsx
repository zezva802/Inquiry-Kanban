import { KanbanColumn } from "./KanbanColumn";

export function KanbanBoard(){
    return (
        <div className="flex">
            <KanbanColumn title="New Inquiries" phase="new"></KanbanColumn>
            <KanbanColumn title="Sent to Hotels" phase="sent_to_hotels"></KanbanColumn>
            <KanbanColumn title="Received offers" phase="offers_received"></KanbanColumn>
            <KanbanColumn title="Completed" phase="completed"></KanbanColumn>
        </div>
    )
}