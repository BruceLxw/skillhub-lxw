import { Toaster as Sonner } from 'sonner'
import { CENTER_TOASTER_ID } from '@/shared/lib/toast'

export function Toaster() {
  return (
    <Sonner
      id={CENTER_TOASTER_ID}
      position="top-center"
      className="!left-1/2 !right-auto !top-4 !-translate-x-1/2"
      offset={16}
      mobileOffset={16}
      toastOptions={{
        toasterId: CENTER_TOASTER_ID,
        classNames: {
          toast: '!bg-[#212529] !text-white mx-auto w-fit max-w-[min(100vw-2rem,32rem)] border-none rounded-[20px] px-6 py-2.5 text-[13px] font-medium shadow-md',
          title: '!text-white font-medium text-center text-[13px]',
          description: '!text-gray-300 text-center text-[12px]',
          content: 'w-full text-center',
          actionButton: 'bg-primary text-primary-foreground',
          cancelButton: 'bg-muted text-muted-foreground',
          error: 'border-destructive/40',
          success: 'border-emerald-500/40',
          warning: 'border-amber-500/40',
          info: 'border-blue-500/40',
        },
      }}
    />
  )
}
