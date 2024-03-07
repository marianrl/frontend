import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="pagination">
            {pageNumbers.map((number) => (
                <button key={number} onClick={() => onPageChange(number)} className={currentPage === number ? 'active' : ''}>
                    {number}
                </button>
            ))}
        </div>
    );
};

export default Pagination;
