import { Inquiry, InquiryPhase } from "@/types/inquiry";
import { InquiryCard } from "./InquiryCard";

interface KanbanColumnProps {
    title: string;
    phase: InquiryPhase;
    inquiries: Inquiry[];
    handleOpenModal: (inquiry: Inquiry) => void;
}

export function KanbanColumn({ title, phase, inquiries, handleOpenModal}: KanbanColumnProps){

    const count = inquiries.length;
    const totalPotentialValue = inquiries.reduce((acc, i) => {return acc + i.potentialValue}, 0);
    const formatter = new Intl.NumberFormat('en-CH', {
        style: 'currency',
        currency: 'CHF',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });
    const formattedValue = formatter.format(totalPotentialValue);

    return(
        <div className="w-80 bg-white p-4 rounded-lg mx-2 min-h-screen">
            <header className="mb-4">
                <h2 className="font-bold text-gray-800">{title}</h2>
                <div className="text-sm text-gray-600">
                    <p>{count} inquiries</p>
                    <p>Total: {formattedValue}</p>
                </div>
            </header>
            {inquiries.map((inquiry) => (
                <InquiryCard handleOpenModal={handleOpenModal} key={inquiry.id} inquiry={inquiry}/>
            ))}
        </div>
    )
}