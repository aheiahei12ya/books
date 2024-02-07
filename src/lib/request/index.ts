const getOptions = (data?: any) => ({
  method: 'GET'
})

const postOptions = (data?: any) => ({
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
})

const getUrl = (path: string) => {
  if (import.meta.env.VITE_DEV_PREFIX) {
    return `${import.meta.env.VITE_DEV_PREFIX}${path}`
  }
  return `${import.meta.env.VITE_PROD_PREFIX}${path}`
}

const createRequest =
  <T, V>(path: string, method = 'GET') =>
  (data?: T) => {
    const options = method === 'GET' ? getOptions : postOptions
    return fetch(getUrl(path), options(data)).then((res) => res as V)
  }

export { createRequest }
