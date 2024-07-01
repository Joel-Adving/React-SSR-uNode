import { useEffect } from 'react'
import { useLoaderData, Link } from 'react-router-dom'

export default function Home() {
  const data = useLoaderData() as any

  useEffect(() => {
    console.log('Hello from the client!')
  }, [])

  return (
    <h1>
      {data.message}
      <Link to={'/about'}>About</Link>
    </h1>
  )
}
