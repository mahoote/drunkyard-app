import { AUTH_ROUTES } from '@/src/config/authConfig'

/**
 * Check if a route is protected
 * Return false means the route is public
 * @param path
 */
export function isProtectedRoute(path: string): boolean {
    return AUTH_ROUTES[path] ?? false
}
