import { Button } from '@/shared/ui/button'

interface PaginationProps {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  return (
    <div className="flex items-center justify-center gap-1 pt-5">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 0}
        className="w-[34px] h-[34px] p-0"
      >
        &larr;
      </Button>
      {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => (
        <Button
          key={i}
          variant={i === page ? 'default' : 'outline'}
          size="sm"
          onClick={() => onPageChange(i)}
          className="w-[34px] h-[34px] p-0 text-[13px] font-medium"
        >
          {i + 1}
        </Button>
      ))}
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages - 1}
        className="w-[34px] h-[34px] p-0"
      >
        &rarr;
      </Button>
    </div>
  )
}
