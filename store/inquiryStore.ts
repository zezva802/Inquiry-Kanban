import {create} from 'zustand';
import { Inquiry, InquiryPhase } from '@/types/inquiry';
import { mockInquiries } from '@/lib/mockData';

interface InquiryStore {
    inquiries: Inquiry[];
    selectedInquiry: Inquiry | null;
    isModalOpen: boolean;
    updatePhase: (id: string, phase: InquiryPhase) => Promise<void>;
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

export const useInquiryStore = create<InquiryStore>((set, get) => ({
    inquiries: mockInquiries,
    selectedInquiry: null,
    isModalOpen: false,

    updatePhase: async (id, phase) => {
        const original = get().inquiries.find(i => i.id === id)
        
        set((state) => ({
            inquiries: state.inquiries.map((i) => i.id === id ? { ...i, phase } : i)
        }))

        try {
            await fetch(`/api/inquiries/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phase })
            })
        } catch {
            if (original) {
                set((state) => ({
                    inquiries: state.inquiries.map((i) => i.id === id ? { ...i, phase: original.phase } : i)
                }))
            }
        }
    },
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