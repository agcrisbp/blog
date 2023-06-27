import UnstyledLink from '@/components/atoms/UnstyledLink'

import { twclsx } from '@/libs/twclsx'

import { Blog } from 'next-starter-blog'

interface BlogCardProps extends Blog {
  slug: string
  layout: 'row' | 'column'
}

const BlogCard: React.FunctionComponent<BlogCardProps> = ({ slug, title, summary, thumbnail, layout = 'row' }) => {
  return (
    <UnstyledLink
      className={twclsx(
        'flex flex-col p-4 w-full h-full',
        'border rounded-lg transition',
        'border-main-2 dark:border-main-3',
        'hover:border-main-4 dark:hover:border-main-2'
      )}
      href={`/posts/${slug}`}
    >
      <h3>{title}</h3>
      {layout === 'column' && <img className='mt-[0.675em]' src={thumbnail} />}
      {layout === 'column' && <p className='mt-[0.675em]'>{summary}</p>}
    </UnstyledLink>
  )
}

export default BlogCard
