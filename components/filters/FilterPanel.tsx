import { useInquiryStore } from "@/store/inquiryStore";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export function FilterPanel() {
    const {filters, setFilter, clearFilters} = useInquiryStore();
    const searchParams = useSearchParams();
        const [localName, setLocalName] = useState(searchParams.get('clientName') || '');
    const router = useRouter();

    useEffect(() => {
        const name = searchParams.get('clientName');
        if(name) setFilter('clientName', name);
        const dateFrom = searchParams.get('dateFrom');
        if(dateFrom) setFilter('dateFrom', dateFrom);
        const dateTo = searchParams.get('dateTo');
        if(dateTo) setFilter('dateTo', dateTo);
        const minValue = searchParams.get('minValue');
        if(minValue) setFilter('minValue', Number(minValue));

    }, []);

    useEffect(() => {
        const params = new URLSearchParams()
        if (filters.clientName) params.set('clientName', filters.clientName)
        if (filters.dateFrom) params.set('dateFrom', filters.dateFrom)
        if (filters.dateTo) params.set('dateTo', filters.dateTo)
        if (filters.minValue) params.set('minValue', String(filters.minValue))
        router.replace(`?${params.toString()}`)
    }, [filters])

    useEffect(() => {
        const timer = setTimeout(() => {
            setFilter('clientName', localName)
        }, 500)

        return () => clearTimeout(timer)
    }, [localName])

    const activeFilterCount = [
        filters.clientName !== '',
        filters.dateFrom !== '',
        filters.dateTo !== '',
        filters.minValue > 0
    ].filter(Boolean).length;

    return(
        <div className="flex gap-4 bg-white rounded-lg p-4 shadow-sm mb-6">
            <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-500">Client Name</label>
                <input type="text" placeholder="Search client name" value={localName} onChange={(e) => setLocalName(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-2 text-sm"/>
            </div>
            <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-500">Date From</label>
                <input type="date" value={filters.dateFrom} onChange={(e) => setFilter('dateFrom', e.target.value)} className="border border-gray-200 rounded-lg px-3 py-2 text-sm" />
            </div>
            <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-500">Date To</label>
                <input type="date" value={filters.dateTo} onChange={(e) => setFilter('dateTo', e.target.value)} className="border border-gray-200 rounded-lg px-3 py-2 text-sm"/>
            </div>
            <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-500">Min Value</label>
                <input type="number" value={filters.minValue} onChange={(e) => setFilter('minValue', Number(e.target.value))} className="border border-gray-200 rounded-lg px-3 py-2 text-sm"/>
            </div>

            <button onClick={() => {clearFilters(); setLocalName('')}}
                className="self-end px-4 py-2 text-sm rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                Clear filters
                {activeFilterCount > 0 && (
                    <span className="ml-2 bg-blue-500 text-white text-xs rounded-full px-1.5 py-0.5 pr-2">
                        {activeFilterCount}
                    </span>
                )}
            </button>
        </div>
    )
}