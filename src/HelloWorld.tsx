import React from 'react'

type Props = {
  name: string
}

export default function HelloWorld({ name }: Props) {
  return (
    <div>
      <h1>Hello, {name}!</h1>
    </div>
  )
}
