const getCookie = (name: string) => {
  const cookieArray = document.cookie.split(';')
  const cookies: any = {}
  cookieArray.map((cookie) => {
    const [k, v] = cookie.split('=')
    cookies[k] = v
  })
  return cookies[name]
}

export { getCookie }
