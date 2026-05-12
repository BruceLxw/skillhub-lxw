import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/shared/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-[6px] text-[13px] font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-[#212529] text-white shadow-sm hover:bg-black hover:shadow-[0_2px_8px_rgba(0,0,0,.12)] hover:-translate-y-px',
        destructive:
          'bg-white text-[#ef4444] border border-[#ef4444] hover:bg-[#fef2f2]',
        outline:
          'border border-[#e9ecef] bg-white text-[#495057] hover:bg-[#f8f9fa] hover:border-[#dee2e3]',
        secondary:
          'bg-[#f1f3f5] text-[#343a40] hover:bg-[#e9ecef]',
        ghost:
          'hover:bg-[#f1f3f5] hover:text-[#212529]',
        link:
          'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-[34px] px-4 py-0',
        sm: 'h-7 rounded-[6px] px-2.5 text-[12px]',
        lg: 'h-10 rounded-[8px] px-6 text-[14px]',
        icon: 'h-[34px] w-[34px]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
