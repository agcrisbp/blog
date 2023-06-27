import BlogCard from '@/components/mollecules/BlogCard'
import Hero from '@/components/template/Hero'
import Layout from '@/components/template/Layout'

import { getBlog } from '@/helpers'
import { twclsx } from '@/libs/twclsx'

import { GetStaticProps, NextPage } from 'next'
import { Blog } from 'next-starter-blog'
import { useCallback, useState } from 'react'

type TagsProps = { tags: string[]; blogs: Blog[] }

const Tags: NextPage<TagsProps> = ({ tags = [], blogs = [] }) => {
  const [selectedTags, setSelectedTag] = useState<string[]>([])

  const getClassName = (tagType: string) => {
    const tagColor: Record<string, string> = {
      php: 'bg-primary-5 text-white',
      termux: 'bg-red-500 text-white',
      javascript: 'bg-sky-500 text-white',
      whatsapp: 'bg-fuchsia-500 text-white',
      phpmyadmin: 'bg-slate-700 text-white',
      google: 'bg-pink-500 text-white'
    }
    const defaultColor = 'text-neutral-700 dark:text-neutral-200 bg-neutral-100 dark:bg-neutral-800'

    return tagColor[tagType.toLowerCase()] || defaultColor
  }
  const meta = {
    title: 'Label',
    template: 'Tulisan Agcrismanto Budhi Praswastyka',
    description: `Cari tulisan spesifik berdasarkan label.`,
    openGraph: {
      images: [
        {
          url: 'https://v2.amp-cdn.net/images/480468a77ad0a1a6b1b2e773d9371249e13e3ca2aff757',
          alt: 'NEXT.js Starter Blog',
          width: 1200,
          height: 600
        }
      ]
    }
  }

  const handleClick = useCallback(
    (value: string) => {
      setSelectedTag((prevState) =>
        prevState.includes(value) ? prevState.filter((t) => t !== value) : [...prevState, value]
      )
    },
    [selectedTags]
  )

  console.info(selectedTags)

  return (
    <Layout {...meta} as='main'>
      <Hero {...meta} />
      {tags.length > 0 && (
        <section className={twclsx('flex flex-col', 'mt-4 gap-4')}>
          <div className={twclsx('flex items-stretch flex-wrap', 'w-full', 'gap-2 mb-4 md:mb-8')}>
            {tags.map((tag) => (
              <button
                onClick={() => handleClick(tag)}
                key={tag}
                className={twclsx(
                  'inline-flex items-center justify-center',
                  'py-2 px-4 rounded-xl font-semibold transition-all',
                  !selectedTags.includes(tag) && 'motion-safe:active:scale-95 motion-safe:hover:scale-110',
                  !selectedTags.includes(tag) && selectedTags.length > 0
                    ? 'bg-neutral-500 text-white dark:bg-neutral-200 dark:text-neutral-900'
                    : getClassName(tag)
                )}
              >
                {tag}
              </button>
            ))}
          </div>

          {selectedTags.length > 0 && (
            <div className={twclsx('flex flex-col gap-4')}>
              <h2 className={twclsx('mb-4')}>Berdasarkan yang kamu cari:</h2>
              <div className={twclsx('grid grid-cols-1', 'gap-4 flex-auto')}>
                {blogs
                  .filter((blog) => selectedTags.map((t) => blog.tags.includes(t)).includes(true))
                  .map((blog) => (
                    <BlogCard layout='column' key={blog.slug} {...blog} />
                  ))}
              </div>
            </div>
          )}
        </section>
      )}
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<TagsProps> = async () => {
  const blogs = await getBlog()

  const tags = blogs
    .map((b) => b.data.tags)
    .flat()
    .filter((blog, i, blogs) => blogs.indexOf(blog) === i)

  return {
    props: {
      tags,
      blogs: blogs.map((b) => ({ ...b.data, slug: b.slug }))
    }
  }
}

export default Tags
