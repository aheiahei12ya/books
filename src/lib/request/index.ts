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
  if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
    return `http://aheiahei.imdo.co:9200/data/book/${path}`
  } else {
    return path
  }
}

const createRequest =
  <T, V>(path: string, method = 'GET') =>
  (data?: T) => {
    const options = method === 'GET' ? getOptions : postOptions
    return fetch(getUrl(path), options(data)).then((res) => res as V)
  }

export { createRequest }
