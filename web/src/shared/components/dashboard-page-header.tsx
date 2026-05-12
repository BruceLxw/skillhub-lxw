import { useNavigate } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/shared/ui/button'

interface DashboardPageHeaderProps {
  title: string
  subtitle?: string
  actions?: React.ReactNode
  backTo?: string
  backLabel?: string
}

/**
 * Standard header used by dashboard sub-pages so navigation and page framing stay consistent.
 */
export function DashboardPageHeader({ title, subtitle, actions, backTo, backLabel }: DashboardPageHeaderProps) {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <div className="space-y-4">
      <Button variant="ghost" className="px-0 text-muted-foreground hover:text-foreground" onClick={() => navigate({ to: backTo || '/dashboard' })}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        {backLabel || t('dashboard.backToDashboard')}
      </Button>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-[22px] font-bold text-[#212529] mb-1">{title}</h1>
          {subtitle ? <p className="text-[13px] text-[#6c757d]">{subtitle}</p> : null}
        </div>
        {actions}
      </div>
    </div>
  )
}
