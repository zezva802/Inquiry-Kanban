import {create} from 'zustand';
import { Inquiry, InquiryPhase } from '@/types/inquiry';
import { mockInquiries } from '@/lib/mockData';

interface InquiryStore {
    inquiries: Inquiry[];
    selectedInquiry: Inquiry | null;
    isModalOpen: boolean;
    updatePhase: (id: string, phase: InquiryPhase) => void;
    openModal: (inquiry: Inquiry) => void;
    closeModal: () => void;
}

export const useInquiryStore = create<InquiryStore>((set) => ({
    inquiries: mockInquiries,
    selectedInquiry: null,
    isModalOpen: false,

    updatePhase: (id, phase) => set((state) => ({
        inquiries: state.inquiries.map((i) => {
            if (i.id === id) return { ...i, phase }
            return i
        })
    })),
    openModal: (inquiry) => set({
        selectedInquiry : inquiry,
        isModalOpen : true,
    }),
    closeModal: () => set({
        selectedInquiry : null,
        isModalOpen : false,
    }),
}))