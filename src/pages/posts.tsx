import Searchbar from '@/components/mollecules/Searchbar'
import BlogList from '@/components/organism/BlogList'
import Hero from '@/components/template/Hero'
import Layout from '@/components/template/Layout'

import { getBlog } from '@/helpers'
import { useSearchBlogQuery } from '@/hooks'

import type { GetStaticProps, NextPage } from 'next'
import { Blog } from 'next-starter-blog'

const meta = {
  title: 'Semua Tulisan',
  description: 'Selamat membaca.',
  template: 'Tulisan Agcrismanto Budhi Praswastyka',
}

interface BlogPageProps {
  latestPost: Array<Blog>
  allPost: Array<Blog>
}

const BlogPage: NextPage<BlogPageProps> = ({ latestPost = [], allPost = [] }) => {
  const { query, handleChange, filteredBlog } = useSearchBlogQuery(allPost)

  return (
    <Layout as='main' {...meta}>
      <Hero {...meta} />

      <Searchbar onChange={handleChange} value={query} placeholder='Cari Tulisan...' />

      {query.length === 0 && <BlogList blogs={latestPost} title='Tulisan Terbaru' className='mb-20' layout='column' />}
      {query.length === 0 && <BlogList blogs={allPost} title='Semua Tulisan' layout='column' />}

      {query.length > 0 && filteredBlog.length > 0 ? (
        <BlogList blogs={filteredBlog} title='Hasil Pencarian' layout='column' />
      ) : null}

      {query.length > 0 && filteredBlog.length === 0 ? <p>Tidak ditemukan.</p> : null}
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
        .slice(0, 2),
      allPost: blogs.map((b) => ({ ...b.data, slug: b.slug }))
    }
  }
}

export default BlogPage
