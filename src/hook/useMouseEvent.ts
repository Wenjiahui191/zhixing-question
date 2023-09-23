import { useEffect, useState } from 'react'

/**
 * 获取当前鼠标位置hook
 * @returns pointX pointY
 */
function useMouseEvent() {
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)

  const mousemoveHandler = (event: MouseEvent) => {
    setX(event.clientX)
    setY(event.clientY)
  }

  useEffect(() => {
    window.addEventListener('mousemove', mousemoveHandler)

    return () => {
      window.removeEventListener('mousemove', mousemoveHandler)
    }
  }, [])

  return { x, y }
}

export default useMouseEvent
