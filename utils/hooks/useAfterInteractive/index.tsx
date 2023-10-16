import { useCallback, useEffect, useState } from 'react'

export const useAfterInteractive = (
  executeFunc: () => void,
  dependencies: any[],
  options?: {
    unmountFunc: () => void
  },
) => {
  const [interactive, setInteractive] = useState(false)

  const onInteractive = useCallback(() => {
    if (!interactive) {
      setInteractive(true)
      executeFunc()
      ;['scroll', 'touchstart'].forEach((ev) =>
        window.removeEventListener(ev, onInteractive),
      )
    }
  }, [interactive])

  useEffect(() => {
    if (!interactive) {
      ;['scroll', 'touchstart'].forEach((ev) =>
        window.addEventListener(ev, onInteractive),
      )

      return () => {
        options?.unmountFunc && options.unmountFunc()
      }
    }
  }, [interactive])

  useEffect(() => {
    if (interactive && dependencies.length > 0) {
      executeFunc()

      return () => {
        options?.unmountFunc && options.unmountFunc()
      }
    }
  }, [interactive, ...dependencies])
}
