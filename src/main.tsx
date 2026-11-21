import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App, { prepareInitialRoute } from './App.tsx'

const container = document.getElementById('root')!
container.removeAttribute('data-app-ready')

async function start() {
  await prepareInitialRoute(window.location.pathname)
  createRoot(container).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

// If a route chunk fails, retain the readable static page and native links.
start().catch((error) => console.error('The interactive page could not start.', error))
