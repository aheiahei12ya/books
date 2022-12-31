import { useRouter } from 'next/router'
import { useEffect } from 'react'

const HomePage = () => {
  const router = useRouter()
  useEffect(() => {
    router.push('/home')
  }, [router])
}

export default HomePage
