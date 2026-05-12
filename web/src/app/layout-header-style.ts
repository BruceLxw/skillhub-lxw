import { cn } from '@/shared/lib/utils'

const APP_TOPBAR_BASE_CLASS_NAME =
  'fixed top-0 right-0 z-40 flex items-center justify-between bg-white/85 backdrop-blur-[12px] transition-shadow duration-200'

const APP_TOPBAR_ELEVATED_CLASS_NAME = 'shadow-[0_1px_0_rgba(0,0,0,.04)]'

export function getAppTopbarClassName(isElevated: boolean): string {
  return cn(APP_TOPBAR_BASE_CLASS_NAME, isElevated && APP_TOPBAR_ELEVATED_CLASS_NAME)
}
