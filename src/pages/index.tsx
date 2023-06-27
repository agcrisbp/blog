import UnstyledLink from '@/components/atoms/UnstyledLink'
import BlogList from '@/components/organism/BlogList'
import HeroWithPhoto from '@/components/template/HeroWithPhoto'
import Layout from '@/components/template/Layout'

import { getBlog, ownerName } from '@/helpers'
import { twclsx } from '@/libs/twclsx'

import { ArrowSmRightIcon } from '@heroicons/react/outline'
import type { GetStaticProps, NextPage } from 'next'
import { Blog } from 'next-starter-blog'

interface HomeProps {
  blogs: Array<Blog>
}

const Home: NextPage<HomeProps> = ({ blogs = [] }) => {
  const meta = {
    title: 'Selamat Datang',
    template: 'Tulisan Agcrismanto Budhi Praswastyka',
    description: `Perkenalkan, nama saya Agcrismanto Budhi Praswastyka, saya adalah seorang programmer yang berfokus pada bidang Cybersecurity dan Web Developer.`,
    openGraph: {
      images: [
        {
          url: 'https://v2.amp-cdn.net/images/480468a77ad0a1a6b1b2e773d9371249e13e3ca2aff757',
          alt: 'Tulisan',
          width: 1200,
          height: 600
        }
      ]
    }
  }

  return (
    <Layout as='main' {...meta}>
      <HeroWithPhoto image='/favicon.ico' imageAlt={ownerName} {...meta}>
        <p className={twclsx('max-w-prose mt-2')}>
          Situs ini berisi dokumentasi dari tulisan dan opini saya untuk bahan pembelajaran maupun bacaan semata. Beberapa artikel saya tulis dalam Bahasa Inggris agar dapat bermanfaat dan dibaca oleh teman-teman dari mancanegara.
        </p>
      </HeroWithPhoto>

      <BlogList blogs={blogs} title='Tulisan Terbaru'>
        <UnstyledLink
          href='/posts'
          className={twclsx(
            'group',
            'items-center space-x-1 font-medium',
            'hover:text-primary-3 dark:hover:text-primary-2'
          )}
        >
          <span>Lihat semua tulisan</span>
          <ArrowSmRightIcon
            className={twclsx(
              'inline-flex w-4 h-4 transition-all duration-200',
              '-translate-x-4 group-hover:translate-x-0',
              'opacity-0 group-hover:opacity-100'
            )}
          />
        </UnstyledLink>
      </BlogList>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const blogs = await getBlog()

  return {
    props: {
      blogs: blogs.map((b) => ({ ...b.data, slug: b.slug })).filter((b) => b.featured)
    }
  }
}

export default Home
