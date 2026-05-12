import { cn } from '@/shared/lib/utils'

interface NamespaceBadgeProps {
  type: 'GLOBAL' | 'TEAM'
  name: string
  className?: string
}

export function NamespaceBadge({ type, name, className }: NamespaceBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-[12px] px-[10px] py-0.5 text-[11px] font-semibold',
        type === 'GLOBAL'
          ? 'bg-[#eafaf1] text-[#15824a]'
          : 'bg-[#eef1fd] text-[#4f6ef6]',
        className
      )}
    >
      {name}
    </span>
  )
}
