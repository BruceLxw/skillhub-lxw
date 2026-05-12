import * as React from 'react'
import { cn } from '@/shared/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const INPUT_BASE_CLASS_NAME =
  'flex h-[40px] w-full rounded-[8px] border bg-white px-3.5 py-2 text-[13px] text-foreground ring-offset-background transition-all duration-150 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#adb5bd] focus-visible:outline-none focus-visible:border-[#4f6ef6] focus-visible:shadow-[0_0_0_3px_rgba(79,110,246,.1)] disabled:cursor-not-allowed disabled:opacity-50'

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, style, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          INPUT_BASE_CLASS_NAME,
          className
        )}
        style={{ ...style }}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

export { Input }
