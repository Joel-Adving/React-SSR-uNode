import { Link } from 'react-router-dom'

export default function About() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <h2>About</h2>
      <Link to="/">Go back home</Link>
    </div>
  )
}
