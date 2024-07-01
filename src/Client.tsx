import React from 'react'

import { hydrateRoot } from 'react-dom/client'
import App from './App'

const container = document.getElementById('app')
if (container) {
  hydrateRoot(container, <App />)
}
