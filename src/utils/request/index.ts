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

const createRequest =
  <T, V>(path: string, method = 'GET') =>
  (data?: T) => {
    const options = method === 'GET' ? getOptions : postOptions
    return fetch(path, options(data)).then((res) => res as V)
  }

export { createRequest }
