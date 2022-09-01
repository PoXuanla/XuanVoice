import { useState, useEffect } from 'react'
const useObserver = (node) => {
  const [intersected, setIntersected] = useState(false)
  useEffect(() => {
      const target = node.current
      
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIntersected(true)
          }
          setIntersected(false)
        })
      },
      { threshold: 1 }
    )
    observer.observe(target)
    return () => {
      observer.unobserve(target)
    }
  }, [])
  return intersected
}
export default useObserver
