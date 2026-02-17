"use client";

import { KanbanColumn } from "./KanbanColumn";
import { InquiryPhase } from "@/types/inquiry";
import { InquiryDetailModal } from "../modal/InquiryDetailModal";
import { DndContext, DragEndEvent, useSensors, useSensor, PointerSensor } from "@dnd-kit/core";
import { useInquiryStore } from "@/store/inquiryStore";
import { useEffect, Suspense } from "react";
import { FilterPanel } from "../filters/FilterPanel";


export function KanbanBoard(){
    const { inquiries, isModalOpen, selectedInquiry, updatePhase, openModal, fetchInquiries, isLoading, error, filters} = useInquiryStore();

    useEffect(() => {
        fetchInquiries()
    }, []);

    const filteredInquiries = inquiries.filter((i) => {
        if(filters.clientName && !i.clientName.toLowerCase().includes(filters.clientName.toLowerCase()))
            return false;

        if(filters.dateFrom && i.eventDate < filters.dateFrom)
            return false;

        if(filters.dateTo && i.eventDate > filters.dateTo)
            return false;

        if(filters.minValue && i.potentialValue < filters.minValue)
            return false;

        return true;
    });

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

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>{error}</div>

    return (
        <>  
            <Suspense fallback={null}>
                <FilterPanel />
            </Suspense>
            
            {isModalOpen && selectedInquiry && <InquiryDetailModal inquiry={selectedInquiry}></InquiryDetailModal> }
            <DndContext onDragEnd={onDragEnd} sensors={sensors}>
                <div className="flex overflow-x-auto pb-4 gap-4">
                        <KanbanColumn title="New Inquiries" phase="new" inquiries={filteredInquiries.filter(i => i.phase === "new")} handleOpenModal={openModal}></KanbanColumn>
                        <KanbanColumn title="Sent to Hotels" phase="sent_to_hotels" inquiries={filteredInquiries.filter(i => i.phase === "sent_to_hotels")} handleOpenModal={openModal}></KanbanColumn>
                        <KanbanColumn title="Received offers" phase="offers_received" inquiries={filteredInquiries.filter(i => i.phase === "offers_received")} handleOpenModal={openModal}></KanbanColumn>
                        <KanbanColumn title="Completed" phase="completed" inquiries={filteredInquiries.filter(i => i.phase === "completed")} handleOpenModal={openModal}></KanbanColumn>
                </div>
            </DndContext>
        </>
    )
}