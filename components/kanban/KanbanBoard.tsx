"use client";

import { useState } from "react";
import { KanbanColumn } from "./KanbanColumn";
import { mockInquiries } from "@/lib/mockData";
import { Inquiry } from "@/types/inquiry";
import { InquiryDetailModal } from "../modal/InquiryDetailModal";

export function KanbanBoard(){
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

    const handleOpenModal = (inquiry: Inquiry) => {
        setSelectedInquiry(inquiry);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedInquiry(null);
    }

    return (
        <>  
            {isModalOpen && selectedInquiry && <InquiryDetailModal inquiry={selectedInquiry} onClose={handleCloseModal}></InquiryDetailModal> }
            <div className="flex">
                <KanbanColumn title="New Inquiries" phase="new" inquiries={mockInquiries.filter(i => i.phase === "new")} handleOpenModal={handleOpenModal}></KanbanColumn>
                <KanbanColumn title="Sent to Hotels" phase="sent_to_hotels" inquiries={mockInquiries.filter(i => i.phase === "sent_to_hotels")} handleOpenModal={handleOpenModal}></KanbanColumn>
                <KanbanColumn title="Received offers" phase="offers_received" inquiries={mockInquiries.filter(i => i.phase === "offers_received")} handleOpenModal={handleOpenModal}></KanbanColumn>
                <KanbanColumn title="Completed" phase="completed" inquiries={mockInquiries.filter(i => i.phase === "completed")} handleOpenModal={handleOpenModal}></KanbanColumn>
            </div>
        </>
    )
}