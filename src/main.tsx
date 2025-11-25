import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/index.css'
import HomeFeed from "./HomeFeed.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HomeFeed />
  </StrictMode>,
)
