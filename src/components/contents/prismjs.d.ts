declare module 'prismjs' {
  const Prism: {
    highlightAll: () => void
    highlight: (code: string, grammar: unknown, language: string) => string
    highlightElement: (element: HTMLElement) => void
    languages: {
      [language: string]: unknown
    }
  }
  export default Prism
}
