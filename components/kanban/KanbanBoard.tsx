"use client";

import { KanbanColumn } from "./KanbanColumn";
import { InquiryPhase } from "@/types/inquiry";
import { InquiryDetailModal } from "../modal/InquiryDetailModal";
import { DndContext, DragEndEvent, useSensors, useSensor, PointerSensor } from "@dnd-kit/core";
import { useInquiryStore } from "@/store/inquiryStore";


export function KanbanBoard(){
    const { inquiries, isModalOpen, selectedInquiry, updatePhase, openModal} = useInquiryStore()

    const onDragEnd = (dragEndEvent: DragEndEvent) => {
        const activeId = dragEndEvent.active.id;
        const overId = dragEndEvent.over?.id;

        if(!overId) {
            return;
        }

        updatePhase(activeId as string, overId as InquiryPhase);
    }

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8
            }
        })
    )

    return (
        <>  
            {isModalOpen && selectedInquiry && <InquiryDetailModal inquiry={selectedInquiry}></InquiryDetailModal> }
            <DndContext onDragEnd={onDragEnd} sensors={sensors}>
                <div className="flex">
                        <KanbanColumn title="New Inquiries" phase="new" inquiries={inquiries.filter(i => i.phase === "new")} handleOpenModal={openModal}></KanbanColumn>
                        <KanbanColumn title="Sent to Hotels" phase="sent_to_hotels" inquiries={inquiries.filter(i => i.phase === "sent_to_hotels")} handleOpenModal={openModal}></KanbanColumn>
                        <KanbanColumn title="Received offers" phase="offers_received" inquiries={inquiries.filter(i => i.phase === "offers_received")} handleOpenModal={openModal}></KanbanColumn>
                        <KanbanColumn title="Completed" phase="completed" inquiries={inquiries.filter(i => i.phase === "completed")} handleOpenModal={openModal}></KanbanColumn>
                </div>
            </DndContext>
        </>
    )
}