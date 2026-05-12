export const LANDING_MAIN_CLASS_NAME = 'flex-1 pt-[56px]'
export const DEFAULT_MAIN_CLASS_NAME = 'flex-1 pt-[56px] px-6 py-8 md:px-8'
export const CENTERED_MAIN_CLASS_NAME = 'flex-1 pt-[56px] px-8 py-8'
export const CENTERED_SEARCH_CONTENT_CLASS_NAME = 'mx-auto w-full max-w-[1200px]'
export const CENTERED_DASHBOARD_CONTENT_CLASS_NAME = 'mx-auto w-full max-w-[1200px]'

interface AppMainContentLayout {
  mainClassName: string
  contentClassName: string
}

export function resolveAppMainContentPathname(
  pathname: string,
  resolvedPathname?: string,
): string {
  return resolvedPathname ?? pathname
}

export function getAppMainContentLayout(pathname: string): AppMainContentLayout {
  if (pathname === '/') {
    return {
      mainClassName: LANDING_MAIN_CLASS_NAME,
      contentClassName: '',
    }
  }

  if (pathname === '/search') {
    return {
      mainClassName: CENTERED_MAIN_CLASS_NAME,
      contentClassName: CENTERED_SEARCH_CONTENT_CLASS_NAME,
    }
  }

  if (pathname === '/dashboard' || pathname.startsWith('/dashboard/')) {
    return {
      mainClassName: CENTERED_MAIN_CLASS_NAME,
      contentClassName: CENTERED_DASHBOARD_CONTENT_CLASS_NAME,
    }
  }

  return {
    mainClassName: DEFAULT_MAIN_CLASS_NAME,
    contentClassName: '',
  }
}
