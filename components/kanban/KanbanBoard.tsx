"use client";

import { useState } from "react";
import { KanbanColumn } from "./KanbanColumn";
import { mockInquiries } from "@/lib/mockData";
import { Inquiry, InquiryPhase } from "@/types/inquiry";
import { InquiryDetailModal } from "../modal/InquiryDetailModal";
import { DndContext, DragEndEvent } from "@dnd-kit/core";

export function KanbanBoard(){
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
    const [inquiries, setInquiries] = useState<Inquiry[]>(mockInquiries)

    const handleOpenModal = (inquiry: Inquiry) => {
        setSelectedInquiry(inquiry);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedInquiry(null);
    }

    const onDragEnd = (dragEndEvent: DragEndEvent) => {
        const activeId = dragEndEvent.active.id;
        const overId = dragEndEvent.over?.id;

        if(!overId) {
            return;
        }


        setInquiries(inquiries.map((i) => {
            if (i.id === activeId) {
                return {...i, phase: overId as InquiryPhase}
            }
            else{
                return i;
            }
        }));
    }

    return (
        <>  
            {isModalOpen && selectedInquiry && <InquiryDetailModal inquiry={selectedInquiry} onClose={handleCloseModal}></InquiryDetailModal> }
            <DndContext onDragEnd={onDragEnd}>
                <div className="flex">
                        <KanbanColumn title="New Inquiries" phase="new" inquiries={inquiries.filter(i => i.phase === "new")} handleOpenModal={handleOpenModal}></KanbanColumn>
                        <KanbanColumn title="Sent to Hotels" phase="sent_to_hotels" inquiries={inquiries.filter(i => i.phase === "sent_to_hotels")} handleOpenModal={handleOpenModal}></KanbanColumn>
                        <KanbanColumn title="Received offers" phase="offers_received" inquiries={inquiries.filter(i => i.phase === "offers_received")} handleOpenModal={handleOpenModal}></KanbanColumn>
                        <KanbanColumn title="Completed" phase="completed" inquiries={inquiries.filter(i => i.phase === "completed")} handleOpenModal={handleOpenModal}></KanbanColumn>
                </div>
            </DndContext>
        </>
    )
}