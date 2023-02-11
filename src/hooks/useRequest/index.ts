import { useCallback, useEffect, useState } from 'react'

import { useRequestOptions, useRequestReturn } from '@/hooks/useRequest/types'
import { BaseResponse } from '@/lib/response/types'

function useRequest<T = any>(requestFn: (data?: T) => Promise<any>, options?: useRequestOptions): useRequestReturn {
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<object>()
  const [error, setError] = useState<Error>()
  const [once, setOnce] = useState<boolean>(true)

  const run = useCallback(
    (data?: T) => {
      setLoading(true)
      requestFn(data)
        .then((res: Response) => res.json())
        .then((jsonData: BaseResponse) => {
          setData(jsonData)
          options?.onSuccess?.(jsonData)
        })
        .catch((err: Error) => {
          setError(err as Error)
          options?.onError?.()
        })
        .finally(() => {
          setLoading(false)
        })
    },
    [] // eslint-disable-line
  )

  useEffect(() => {
    if (!options?.manual) {
      run(options?.defaultParams)
    }
    if (options?.once && once) {
      run(options?.defaultParams)
      setOnce(false)
    }
  }, [once, options?.defaultParams, options?.manual, options?.once, run])

  return {
    loading,
    data,
    error,
    run
  }
}

export default useRequest
