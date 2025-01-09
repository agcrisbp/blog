import UnderlineLink from '@/components/mollecules/UnderlineLink'
import Layout from '@/components/template/Layout'

import { twclsx } from '@/libs/twclsx'

import type { NextPage } from 'next'

const NotFoundPage: NextPage = () => {
  const meta = {
    title: '404 Error',
    template: 'Page Not Found',
    description: 'Halaman tidak ditemukan.'
  }
  return (
    <Layout {...meta}>
      <section className={twclsx('flex flex-col items-center justify-center', '-mt-16 md:-mt-20', 'min-h-screen')}>
        <h1 className={twclsx('text-center')}>404 | Not Found</h1>
        <p className={twclsx('text-center max-w-prose', 'my-4')}>
          Halaman yang kamu cari tidak ditemukan, jika menurutmu ini sebuah kesalahan, tolong hubungi kami melalui{' '}
          <UnderlineLink href="https://aghea.vercel.app/security">email</UnderlineLink>.
        </p>
        <UnderlineLink href='/'>Kembali Ke Beranda</UnderlineLink>
      </section>
    </Layout>
  )
}

export default NotFoundPage
