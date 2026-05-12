import { useTranslation } from 'react-i18next'
import { cn } from '@/shared/lib/utils'

type VersionStatus =
  | 'DRAFT'
  | 'SCANNING'
  | 'SCAN_FAILED'
  | 'UPLOADED'
  | 'PENDING_REVIEW'
  | 'PUBLISHED'
  | 'REJECTED'
  | 'YANKED'

const statusStyles: Record<VersionStatus, string> = {
  PUBLISHED:
    'bg-[#eafaf1] text-[#15824a]',
  UPLOADED:
    'bg-[#eef1fd] text-[#4f6ef6]',
  PENDING_REVIEW:
    'bg-[#fffcf0] text-[#b45309]',
  REJECTED:
    'bg-[#fef2f2] text-[#dc2626]',
  SCANNING:
    'bg-[#eef1fd] text-[#4f6ef6]',
  SCAN_FAILED:
    'bg-[#fef2f2] text-[#dc2626]',
  YANKED:
    'bg-[#f1f3f5] text-[#6c757d]',
  DRAFT:
    'bg-[#f1f3f5] text-[#6c757d]',
}

const i18nKeys: Record<VersionStatus, string> = {
  DRAFT: 'skillDetail.versionStatusDraft',
  SCANNING: 'skillDetail.versionStatusScanning',
  SCAN_FAILED: 'skillDetail.versionStatusScanFailed',
  UPLOADED: 'skillDetail.versionStatusUploaded',
  PENDING_REVIEW: 'skillDetail.versionStatusPendingReview',
  PUBLISHED: 'skillDetail.versionStatusPublished',
  REJECTED: 'skillDetail.versionStatusRejected',
  YANKED: 'skillDetail.versionStatusYanked',
}

/** Color-coded row styles (left-border + subtle background) for version cards. */
export const versionRowStyles: Record<VersionStatus, string> = {
  UPLOADED:
    'border-l-[3px] !border-l-blue-500 bg-blue-500/[0.03]',
  PENDING_REVIEW:
    'border-l-[3px] !border-l-amber-500 bg-amber-500/[0.03]',
  REJECTED:
    'border-l-[3px] !border-l-red-500 bg-red-500/[0.04]',
  SCANNING:
    'border-l-[3px] !border-l-purple-500 bg-purple-500/[0.03]',
  SCAN_FAILED:
    'border-l-[3px] !border-l-red-500 bg-red-500/[0.04]',
  PUBLISHED: '',
  YANKED: '',
  DRAFT: '',
}

export function getVersionRowStyle(status?: string): string {
  if (!status) return ''
  return versionRowStyles[status as VersionStatus] ?? ''
}

export function VersionStatusBadge({
  status,
  className,
}: {
  status?: string
  className?: string
}) {
  const { t } = useTranslation()
  if (!status) return null

  const style = statusStyles[status as VersionStatus] ?? statusStyles.DRAFT
  const label = i18nKeys[status as VersionStatus]
    ? t(i18nKeys[status as VersionStatus])
    : status

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-[12px] px-[10px] py-0.5 text-[11px] font-semibold',
        style,
        className,
      )}
    >
      {label}
    </span>
  )
}
