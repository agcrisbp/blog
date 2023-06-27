import Button from '@/components/atoms/Button'

import { twclsx } from '@/libs/twclsx'

import { ClipboardCopyIcon } from '@heroicons/react/solid'
import { useEffect, useRef, useState } from 'react'
import { Tooltip, TooltipProps } from 'react-tippy'

interface PreProps {
  children: React.ReactNode
}

const Pre: React.FunctionComponent<PreProps> = ({ children }) => {
  const [isCopied, setIsCopied] = useState<boolean>(false)
  const preRef = useRef<HTMLPreElement>(null)
  const tooltipProps = {
    title: 'Tersalin',
    interactive: true,
    hideOnClick: false
  } as TooltipProps

  const copyToClipboard = async () => {
    if (preRef.current && !isCopied) {
      await navigator.clipboard.writeText(preRef.current.textContent as string)
      setIsCopied(true)
    }
  }

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => setIsCopied(false), 1500)

      return () => clearTimeout(timer)
    }
  }, [isCopied])

  return (
    <div className={twclsx('relative')}>
      <div
        className={twclsx(
          'absolute left-0 right-12',
          'h-11 rounded-tl rounded-br',
          'font-semibold text-sm',
          'bg-slate-700 dark:bg-slate-800 text-main-1.5'
        )}
      >
        <div
          className={twclsx('inline-flex items-center justify-start', 'px-4 md:px-8 h-full rounded-tl', 'bg-primary-4')}
        >
        </div>
      </div>

      <div
        className={twclsx(
          'absolute top-0 right-0',
          'flex items-center justify-center',
          'w-11 h-11 rounded-tr rounded-bl',
          'bg-slate-700 dark:bg-slate-800'
        )}
      >
        <Tooltip {...tooltipProps}>
          <Button
            onClick={copyToClipboard}
            screenReaderText='Salin Ke Papan Klip'
            className={twclsx(
              'group relative',
              'inline-flex items-center justify-center',
              'w-8 h-8 rounded-lg transition-all duration-200',
              'ring-main-2',
              'hover:ring'
            )}
          >
            {/* // <CheckCircleIcon className='w-4 h-4 text-emerald-500' /> */}
            <ClipboardCopyIcon className='w-4 h-4 text-main-1' />
          </Button>
        </Tooltip>
      </div>
      <pre ref={preRef} className={twclsx('pt-[3.5rem!important]')}>
        {children}
      </pre>
    </div>
  )
}

export default Pre
