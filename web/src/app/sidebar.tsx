import { useState } from 'react'
import { Link, useRouterState } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { useAuth } from '@/features/auth/use-auth'
import { NotificationBell } from '@/features/notification/notification-bell'
import { UserMenu } from '@/shared/components/user-menu'
import {
  LayoutDashboard,
  Search,
  ClipboardCheck,
  Users,
  Clock,
  Key,
  ChevronDown,
} from 'lucide-react'

interface NavItem {
  label: string
  to: string
  exact?: boolean
  auth?: boolean
  admin?: boolean
  icon: React.ReactNode
  children?: { label: string; to: string; exact?: boolean; auth?: boolean; admin?: boolean }[]
}

export function Sidebar() {
  const { t } = useTranslation()
  const pathname = useRouterState({
    select: (s) => s.location.pathname,
  })
  const { user, hasRole } = useAuth()
  const isAdmin = hasRole('SUPER_ADMIN')
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null)

  const navItems: NavItem[] = [
    { label: t('nav.landing', '首页'), to: '/', exact: true, icon: <LayoutDashboard size={18} /> },
    {
      label: t('nav.skillCenter', '技能中心'),
      to: '/search',
      icon: <Search size={18} />,
      children: [
        { label: t('nav.search', '搜索'), to: '/search' },
        { label: t('nav.publish', '发布技能'), to: '/dashboard/publish', auth: true },
        { label: t('nav.mySkills', '我的技能'), to: '/dashboard/skills', auth: true },
      ],
    },
    { label: t('nav.reviews', '审核管理'), to: '/dashboard/reviews', auth: true, admin: true, icon: <ClipboardCheck size={18} /> },
    { label: t('adminUsers.title', '用户管理'), to: '/admin/users', auth: true, admin: true, icon: <Users size={18} /> },
    { label: t('auditLog.title', '审计日志'), to: '/admin/audit-log', auth: true, admin: true, icon: <Clock size={18} /> },
    { label: t('token.title', 'Token 管理'), to: '/dashboard/tokens', auth: true, icon: <Key size={18} /> },
  ]

  const toggleMenu = (label: string) => {
    setExpandedMenu((prev) => (prev === label ? null : label))
  }

  const isActive = (to: string, exact?: boolean) => {
    if (exact) return pathname === to
    return pathname === to || (to !== '/' && pathname.startsWith(to + '/'))
  }

  const displayName = user?.displayName || ''
  const userInitial = displayName.charAt(0).toUpperCase() || 'U'

  return (
    <aside
      className="fixed top-0 left-0 bottom-0 flex flex-col z-50"
      style={{ width: '232px', background: '#1a1d23' }}
    >
      {/* Brand */}
      <div
        className="flex items-center gap-2.5 px-[18px] shrink-0"
        style={{ height: '56px', borderBottom: '1px solid rgba(255,255,255,.06)' }}
      >
        <div
          className="w-[30px] h-[30px] rounded-lg flex items-center justify-center text-white text-[15px] font-bold"
          style={{ background: '#4f6ef6' }}
        >
          S
        </div>
        <span className="text-[15px] font-semibold tracking-tight" style={{ color: '#e8eaed' }}>
          技能管理平台
        </span>
      </div>

      {/* Navigation */}
      <nav
        className="flex-1 px-2.5 py-4 flex flex-col gap-px overflow-y-auto"
      >
        {navItems.map((item) => {
          if (item.auth && !user) return null
          if (item.admin && !isAdmin) return null

          const hasChildren = !!item.children?.length
          const isExpanded = expandedMenu === item.label
          const childActive = hasChildren
            ? item.children!.some((c) => isActive(c.to, c.exact))
            : false

          return (
            <div key={item.to}>
              {/* Parent item */}
              {hasChildren ? (
                <button
                  type="button"
                  className={
                    'flex items-center gap-2.5 px-3 py-[9px] rounded-[6px] text-[13px] font-[450] transition-all duration-100 w-full text-left border-none cursor-pointer' +
                    (childActive || isExpanded
                      ? ' text-white font-medium'
                      : ' hover:text-[#d5d8dc]')
                  }
                  style={{
                    color: childActive || isExpanded ? '#fff' : '#9498a0',
                    background: childActive && !isExpanded ? '#262b34' : 'transparent',
                  }}
                  onClick={() => toggleMenu(item.label)}
                >
                  <span style={{ opacity: childActive || isExpanded ? 0.85 : 0.5 }}>{item.icon}</span>
                  <span className="flex-1">{item.label}</span>
                  <ChevronDown
                    size={14}
                    className="transition-transform duration-150"
                    style={{
                      opacity: 0.5,
                      transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                  />
                </button>
              ) : (
                <Link
                  to={item.to}
                  search={{} as Record<string, never>}
                  className={
                    'flex items-center gap-2.5 px-3 py-[9px] rounded-[6px] text-[13px] font-[450] transition-all duration-100 no-underline' +
                    (isActive(item.to, item.exact)
                      ? ' text-white font-medium'
                      : ' hover:text-[#d5d8dc]')
                  }
                  style={{
                    color: isActive(item.to, item.exact) ? '#fff' : '#9498a0',
                    background: isActive(item.to, item.exact) ? '#262b34' : 'transparent',
                  }}
                  activeOptions={{ exact: item.exact }}
                >
                  <span style={{ opacity: isActive(item.to, item.exact) ? 0.85 : 0.5 }}>{item.icon}</span>
                  {item.label}
                </Link>
              )}

              {/* Children */}
              {hasChildren && isExpanded && (
                <div className="ml-[27px] border-l border-white/[0.07] pl-3">
                  {item.children!.map((child) => {
                    if (child.auth && !user) return null
                    if (child.admin && !isAdmin) return null
                    const active = isActive(child.to, child.exact)
                    return (
                      <Link
                        key={child.to}
                        to={child.to}
                        search={{} as Record<string, never>}
                        className={
                          'flex items-center gap-2 pr-3 py-[7px] rounded-[6px] text-[12px] font-[450] transition-all duration-100 no-underline' +
                          (active ? ' text-white font-medium' : ' hover:text-[#d5d8dc]')
                        }
                        style={{
                          color: active ? '#fff' : '#9498a0',
                          background: active ? '#262b34' : 'transparent',
                        }}
                        activeOptions={{ exact: child.exact }}
                      >
                        <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: active ? '#fff' : '#9498a0', opacity: active ? 0.6 : 0.3 }} />
                        {child.label}
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </nav>

      {/* User footer */}
      {user && (
        <div
          className="p-2.5 shrink-0"
          style={{ borderTop: '1px solid rgba(255,255,255,.06)' }}
        >
          <div className="flex items-center gap-2 px-2 py-1.5">
            <NotificationBell className="text-[#d5d8dc] hover:bg-[#262b34]" dropUp dropdownClassName="left-0 w-60" />
            <div className="flex-1 min-w-0">
              <UserMenu
                user={user}
                dropUp
                trigger={(
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[13px] font-semibold shrink-0"
                      style={{ background: 'linear-gradient(135deg, #4f6ef6, #8b5cf6)' }}
                    >
                      {userInitial}
                    </div>
                    <div className="overflow-hidden">
                      <div className="text-xs font-medium truncate" style={{ color: '#d5d8dc' }}>
                        {displayName}
                      </div>
                      <div className="text-[11px]" style={{ color: '#9498a0' }}>
                        {isAdmin ? '管理员' : '用户'}
                      </div>
                    </div>
                  </div>
                )}
              />
            </div>
          </div>
        </div>
      )}
    </aside>
  )
}
