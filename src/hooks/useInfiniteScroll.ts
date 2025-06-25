import { useEffect } from 'react'

interface Options {
  target: HTMLElement | null
  threshold?: number
  onLoadMore: () => void
}

const useInfiniteScroll = (options: Options) => {
  const { target, threshold = 10, onLoadMore } = options

  useEffect(() => {
    if (!target) return
    const handleScroll = () => {
      const { scrollHeight, scrollTop, clientHeight } = target
      const distanceToBottom = scrollHeight - scrollTop - clientHeight
      if (distanceToBottom < threshold) {
        onLoadMore()
      }
    }
    target.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => {
      target.removeEventListener('scroll', handleScroll)
    }
  }, [target, threshold, onLoadMore])
}

export default useInfiniteScroll
