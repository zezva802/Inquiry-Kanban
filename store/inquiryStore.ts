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
    isLoading: boolean;
    error: string | null;
    fetchInquiries: () => Promise<void>;
    filters: {
        clientName: string
        dateFrom: string
        dateTo: string
        minValue: number
    }
    setFilter: (key: string, value: string | number) => void
    clearFilters: () => void
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
    isLoading: false,
    error: null,
    fetchInquiries: async () => {
        set({isLoading:true, error: null})
        try {
            const data = await fetch('/api/inquiries').then(r => r.json())
            set({inquiries: data, isLoading: false})
        } catch{
            set({error: 'Failed to fetch inquiries', isLoading: false});
        }
    },
    filters: {
        clientName: '',
        dateFrom: '',
        dateTo: '',
        minValue: 0
    },
    setFilter: (key, value) => set((state) => ({
        filters: { ...state.filters, [key]: value }
    })),
    clearFilters: () => set({
        filters: {
            clientName: '',
            dateFrom: '',
            dateTo: '',
            minValue: 0
        }
    }),
}))