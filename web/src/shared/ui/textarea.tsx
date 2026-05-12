import * as React from 'react'
import { cn } from '@/shared/lib/utils'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-[80px] w-full rounded-[8px] border bg-white px-3.5 py-2.5 text-[13px] text-foreground ring-offset-background transition-all duration-150 placeholder:text-[#adb5bd] focus-visible:outline-none focus-visible:border-[#4f6ef6] focus-visible:shadow-[0_0_0_3px_rgba(79,110,246,.1)] disabled:cursor-not-allowed disabled:opacity-50 resize-y',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = 'Textarea'

export { Textarea }
