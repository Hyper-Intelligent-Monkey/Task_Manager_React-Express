import { useState, useEffect } from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    isFiltering: boolean;
    onPageChange: (page: number) => void;
}

export default function Pagination({currentPage, totalPages, isFiltering, onPageChange}: PaginationProps) {
    const [isSmall, setIsSmall] = useState(typeof window !== 'undefined' ? window.innerWidth < 640 : false);

    useEffect(() => {
        const handleResize = () => setIsSmall(window.innerWidth < 640);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (totalPages <= 1) return null;

    const pages = new Set<number>();
    
    if (isSmall) {
        pages.add(1);
        pages.add(totalPages);
        
        if (currentPage <= 3) {
            for (let i = 1; i <= Math.min(3, totalPages); i++) pages.add(i);
            pages.add(totalPages - 1);
        }
        
        for (let i = Math.max(1, currentPage - 1); i <= Math.min(totalPages, currentPage + 1); i++) {
            pages.add(2);
            pages.add(i);
        }
    } else {
        for (let i = 1; i <= Math.min(4, totalPages); i++) pages.add(i);
        for (let i = Math.max(1, totalPages - 1); i <= totalPages; i++) pages.add(i);
        for (let i = Math.max(1, currentPage - 1); i <= Math.min(totalPages, currentPage + 1); i++) {
            pages.add(i);
        }
    }

    const sortedPages = Array.from(pages).sort((a, b) => a - b);

    return (
        <div className="fixed bottom-0 left-0 right-0 py-8 z-50 pointer-events-none">
            <div className="max-w-5xl mx-auto px-2 sm:px-6 flex justify-center items-center pointer-events-auto">
                <div className="flex items-center gap-1 sm:gap-2">
                    <button
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage <= 1 || isFiltering}
                        className="px-3 py-2 text-xs sm:text-sm font-medium text-slate-600 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 disabled:bg-slate-200 disabled:cursor-not-allowed transition-colors"
                    >
                        <span>Prev</span>
                    </button>
                    
                    <div className="flex items-center gap-1 sm:gap-2">
                        {sortedPages.map((pageNum, i) => {
                            const prevNum = sortedPages[i - 1];
                            const elements = [];

                            if (prevNum && pageNum - prevNum > 1) {
                                elements.push(
                                    <span key={`ellipsis-${pageNum}`} className="px-0.5 sm:px-1 text-slate-400">...</span>
                                );
                            }

                            elements.push(
                                <button
                                    key={pageNum}
                                    onClick={() => onPageChange(pageNum)}
                                    disabled={isFiltering}
                                    className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                                        currentPage === pageNum 
                                        ? "bg-accent text-white shadow-md" 
                                        : "bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100"
                                    }`}
                                >
                                    {pageNum}
                                </button>
                            );
                            return elements;
                        })}
                    </div>

                    <button
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage >= totalPages || isFiltering}
                        className="px-3 py-2 text-xs sm:text-sm font-medium text-slate-600 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 disabled:bg-slate-200 disabled:cursor-not-allowed transition-colors"
                    >
                        <span>Next</span>
                    </button>
                </div>
            </div>
        </div>
    );
}