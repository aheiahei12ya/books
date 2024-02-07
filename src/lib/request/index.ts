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
  async (data?: T) => {
    const options = method === 'GET' ? getOptions : postOptions
    const res = await fetch(getUrl(path), options(data))
    return res as V
  }

export { createRequest }
