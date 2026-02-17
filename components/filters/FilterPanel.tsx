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
        <div>
            <input type="text" placeholder="Search client name" value={localName} onChange={(e) => setLocalName(e.target.value)}/>
            <input type="date" value={filters.dateFrom} onChange={(e) => setFilter('dateFrom', e.target.value)} />
            <input type="date" value={filters.dateTo} onChange={(e) => setFilter('dateTo', e.target.value)} />
            <input type="number" value={filters.minValue} onChange={(e) => setFilter('minValue', Number(e.target.value))}/>

            <button onClick={() => {
                clearFilters()
                setLocalName('')
            }}>
                Clear filters
                {activeFilterCount > 0 && <span>{activeFilterCount}</span>}
            </button>
        </div>
    )
}