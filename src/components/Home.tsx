import { useEffect } from 'react'
import { useLoaderData, Link } from 'react-router-dom'
import { useAtom } from 'jotai'
import { countAtom } from '../store'

export default function Home() {
  const data = useLoaderData() as { message: string }
  const [count, setCount] = useAtom(countAtom)

  useEffect(() => {
    console.log('Successfully hydrated!')
  }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <h2>Home</h2>
      <Link to="/about">Go to about</Link>
      <h4>
        Data fetched from route loader: <pre>{data.message}</pre>
      </h4>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button onClick={() => setCount((prev) => prev + 1)}> Click me</button>
        <span>{count}</span>
      </div>
    </div>
  )
}
