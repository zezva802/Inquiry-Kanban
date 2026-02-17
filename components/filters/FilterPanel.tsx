import { useInquiryStore } from "@/store/inquiryStore";
import { useState, useEffect } from "react";

export function FilterPanel() {
    const {filters, setFilter, clearFilters} = useInquiryStore();
    const [localName, setLocalName] = useState('');

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