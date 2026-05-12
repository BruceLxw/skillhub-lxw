import { Suspense, useEffect, useState } from 'react'
import { Outlet, Link, useRouterState } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { useAuth } from '@/features/auth/use-auth'
import { LanguageSwitcher } from '@/shared/components/language-switcher'
import { Sidebar } from './sidebar'
import { getAppTopbarClassName } from './layout-header-style'
import { getAppMainContentLayout, resolveAppMainContentPathname } from './layout-main-content'

/**
 * Application shell shared by all routed pages.
 *
 * Enterprise ToB sidebar + topbar layout.
 * Sidebar houses brand, navigation, and user info.
 * Topbar provides breadcrumb, actions, and auth controls.
 */
export function Layout() {
  const { t } = useTranslation()
  const { pathname, resolvedPathname } = useRouterState({
    select: (s) => ({
      pathname: s.location.pathname,
      resolvedPathname: s.resolvedLocation?.pathname,
    }),
  })
  const { user, isLoading } = useAuth()
  const [isTopbarElevated, setIsTopbarElevated] = useState(false)
  const contentLayoutPathname = resolveAppMainContentPathname(pathname, resolvedPathname)
  const mainContentLayout = getAppMainContentLayout(contentLayoutPathname)

  useEffect(() => {
    const updateElevation = () => {
      setIsTopbarElevated(window.scrollY > 0)
    }

    updateElevation()
    window.addEventListener('scroll', updateElevation, { passive: true })

    return () => {
      window.removeEventListener('scroll', updateElevation)
    }
  }, [])

  const breadcrumbs: Record<string, string> = {
    '/': t('nav.home'),
    '/skills': t('nav.skills'),
    '/search': t('nav.search'),
    '/dashboard': t('nav.dashboard'),
    '/dashboard/skills': t('nav.mySkills'),
    '/dashboard/publish': t('nav.publish'),
    '/dashboard/namespaces': t('nav.namespaces'),
    '/dashboard/governance': t('nav.governance'),
    '/dashboard/reviews': t('nav.reviews'),
    '/dashboard/reports': t('nav.reports'),
    '/dashboard/promotions': t('nav.promotions'),
    '/dashboard/stars': t('nav.stars'),
    '/dashboard/subscriptions': t('nav.subscriptions'),
    '/dashboard/notifications': t('nav.notifications'),
    '/dashboard/tokens': t('token.title'),
    '/admin/users': t('adminUsers.title'),
    '/admin/audit-log': t('auditLog.title'),
    '/admin/labels': t('adminLabels.title'),
    '/settings/security': t('settings.security'),
    '/settings/profile': t('settings.profile'),
    '/settings/notifications': t('settings.notifications'),
  }

  const currentBreadcrumb = breadcrumbs[pathname] || ''
  const breadcrumbParts = currentBreadcrumb ? currentBreadcrumb.split(' / ') : [t('nav.home')]

  return (
    <div className="min-h-screen flex" style={{ background: '#f8f9fa' }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Right area: topbar + main */}
      <div className="flex flex-col flex-1" style={{ marginLeft: '232px' }}>
        {/* Topbar */}
        <header
          className={getAppTopbarClassName(isTopbarElevated)}
          style={{ borderColor: '#e9ecef', height: '56px', paddingLeft: '28px', paddingRight: '28px' }}
        >
          <div className="text-[13px]" style={{ color: '#6c757d' }}>
            {breadcrumbParts.map((part, i) => (
              <span key={i}>
                {i > 0 && <span style={{ color: '#dee2e3', margin: '0 6px' }}>/</span>}
                {i === breadcrumbParts.length - 1 ? (
                  <span style={{ color: '#212529', fontWeight: 500 }}>{part}</span>
                ) : (
                  <span>{part}</span>
                )}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="w-[34px] h-[34px] rounded-[6px] border-0 bg-transparent cursor-pointer flex items-center justify-center transition-all duration-100"
              style={{ color: '#6c757d' }}
              title={t('nav.refresh')}
              onClick={() => window.location.reload()}
            >
              <svg viewBox="0 0 18 18" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M3 3v4h4" />
                <path d="M15 15v-4h-4" />
                <path d="M15 9a6 6 0 00-9.5-4.5M3 9a6 6 0 009.5 4.5" />
              </svg>
            </button>

            <LanguageSwitcher />

            {isLoading ? null : user ? null : (
              <Link
                to="/login"
                search={{ returnTo: '' }}
                className="hover:opacity-80 transition-opacity text-[13px]"
                style={{ color: '#6c757d' }}
              >
                {t('nav.login')}
              </Link>
            )}
          </div>
        </header>

        {/* Main content */}
        <main className={mainContentLayout.mainClassName}>
          <Suspense
            fallback={
              <div className="space-y-4">
                <div className="h-6 w-48 bg-[#e9ecef] rounded-[6px]" />
                <div className="h-4 w-72 bg-[#e9ecef] rounded-[6px]" />
                <div className="h-48 bg-[#e9ecef] rounded-[6px]" />
              </div>
            }
          >
            <div className={mainContentLayout.contentClassName}>
              <Outlet />
            </div>
          </Suspense>
        </main>

      </div>
    </div>
  )
}
