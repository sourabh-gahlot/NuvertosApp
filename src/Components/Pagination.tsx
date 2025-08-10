import { Button } from "../Components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="flex items-center justify-center space-x-2 mt-8">
      <Button
        variant="outline"
        size="sm"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="disabled:opacity-50  shadow-sm shadow-gray-500 border-none transition-all duration-300 hover:-translate-y-1"
      >
        <span className="flex items-center space-x-1">
          <ChevronLeft className="h-4 w-4" />
          <span>Previous</span>
        </span>
      </Button>

      {totalPages > 1 && (
        <div className="flex space-x-1">
          {Array.from({ length: totalPages }).map((_, index) => {
            const pageNum = index + 1;
            return (
              <Button
                key={pageNum}
                variant={pageNum === currentPage ? "default" : "outline"}
                size="sm"
                onClick={() => onPageChange(pageNum)}
                className={
                  pageNum === currentPage
                    ? "font-bold shadow-sm shadow-gray-500 transition-all bg-blue-500 duration-300 hover:-translate-y-1 "
                    : "border-none  transition-all shadow-sm shadow-gray-200  bg-blue-100  duration-300 hover:-translate-y-1"
                }
              >
                {pageNum}
              </Button>
            );
          })}
        </div>
      )}

      <Button
        variant="outline"
        size="sm"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="disabled:opacity-50 shadow-sm shadow-gray-500 border-none transition-all duration-300 hover:-translate-y-1"
      >
        <span className="flex items-center space-x-1">
          <span>Next</span>
          <ChevronRight className="h-4 w-4" />
        </span>
      </Button>
    </div>
  );
}
