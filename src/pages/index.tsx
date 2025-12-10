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
  latestPost: Array<Blog>
}

const Home: NextPage<HomeProps> = ({ latestPost = [] }) => {
  const meta = {
    title: 'Tulisan Agcrismanto Budhi Praswastyka',
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
          Situs ini berisi dokumentasi dari tulisan dan opini saya untuk bahan pembelajaran maupun bacaan semata.
          Beberapa artikel saya tulis dalam Bahasa Inggris agar dapat bermanfaat dan dibaca oleh teman-teman dari
          mancanegara.
        </p>
      </HeroWithPhoto>

      <BlogList blogs={latestPost} title='Tulisan Terbaru'>
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
      latestPost: blogs
        // map the blogs and add slug property,
        .map((a) => ({ ...a.data, slug: a.slug }))
        // sort descending by date
        .sort((b, a) =>
          new Date(a.published) > new Date(a.published) ? 1 : new Date(a.published) < new Date(b.published) ? -1 : 0
        )
        // cut the first 3 and so on, leave only 2 latest post
        .slice(0, 3)
    }
  }
}

export default Home
