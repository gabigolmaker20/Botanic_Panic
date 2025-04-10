import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppRouter from './routes/AppRouter.jsx'
import App from "./components/Contact/ContactComponent.jsx"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppRouter/>
    <App/>
  </StrictMode>,
)
