export interface AppRoute {
  children: string
  href: string
}

export const APP_ROUTE: Array<AppRoute> = [
  {
    children: 'Beranda',
    href: '/'
  },
  {
    children: 'Tulisan',
    href: '/posts'
  },
  {
    children: 'Label',
    href: '/tags'
  }
]
