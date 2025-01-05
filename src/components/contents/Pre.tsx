import Button from '@/components/atoms/Button'
import { twclsx } from '@/libs/twclsx'
import { ClipboardCopyIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid'
import { useEffect, useRef, useState } from 'react'
import { Tooltip, TooltipProps } from 'react-tippy'
import Prism from 'prismjs';
import 'prismjs/components/';

interface CodeBlock {
  label: string
  content: string
  language: string
}

interface PreProps {
  codeBlocks: CodeBlock[]
}

const Pre: React.FunctionComponent<PreProps> = ({ codeBlocks }) => {
  const [isCopied, setIsCopied] = useState<boolean>(false)
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const [isExpanded, setIsExpanded] = useState<boolean>(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const preRef = useRef<HTMLPreElement>(null)

  const tooltipProps = {
    title: isCopied ? 'Tersalin!' : 'Salin ke Papan Klip',
    interactive: true,
    hideOnClick: false
  } as TooltipProps

  const copyToClipboard = async () => {
    if (preRef.current && !isCopied) {
      await navigator.clipboard.writeText(codeBlocks[activeIndex].content)
      setIsCopied(true)
    }
  }

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => setIsCopied(false), 1500)
      return () => clearTimeout(timer)
    }
  }, [isCopied])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (preRef.current) {
      Prism.highlightElement(preRef.current as HTMLElement);
    }
  }, [activeIndex]);

  const currentContent = codeBlocks[activeIndex].content
  const language = codeBlocks[activeIndex].language
  const lineCount = currentContent.split('\n').length
  const shouldShowToggle = lineCount > 3
  const shouldShowDropdown = codeBlocks.length > 1

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
          className={twclsx('inline-flex items-center justify-start', 'px-4 md:px-1 h-full rounded-tl', 'bg-primary-4')}
        >
          {shouldShowDropdown && (
            <div className="relative" ref={dropdownRef}>
              <button
                className={twclsx(
                  'bg-primary-4 text-white py-1 px-3 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500'
                )}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {codeBlocks[activeIndex].label}
                <ChevronDownIcon className="w-4 h-4 ml-2 inline-block" />
              </button>

              {isDropdownOpen && (
                <div className="absolute mt-1 left-0 right-0 bg-primary-4 shadow-md rounded-md z-10">
                  {codeBlocks.map((block, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setActiveIndex(index)
                        setIsDropdownOpen(false)
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 focus:outline-none"
                    >
                      {block.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
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
            <ClipboardCopyIcon className='w-4 h-4 text-main-1' />
          </Button>
        </Tooltip>
      </div>

      {/* Apply the PrismJS language class */}
      <pre
        ref={preRef}
        className={twclsx(
          'pt-[3.5rem!important]',
          !isExpanded && shouldShowToggle ? 'max-h-32 overflow-hidden' : '',
          `language-${language}` // Dynamically add the language class
        )}
      >
        {currentContent}
      </pre>

      {shouldShowToggle && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={twclsx(
            'absolute right-2 bottom-2 p-1 rounded-full bg-gray-700 hover:bg-gray-600',
            'focus:outline-none focus:ring-2 focus:ring-blue-500'
          )}
        >
          {isExpanded ? (
            <ChevronUpIcon className="w-5 h-5 text-white" />
          ) : (
            <ChevronDownIcon className="w-5 h-5 text-white" />
          )}
        </button>
      )}
    </div>
  )
}

export default Pre