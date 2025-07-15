import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Toaster } from 'sonner'
import { AuthProvider } from './context/AuthContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toaster position='top-center' richColors/>
    <AuthProvider>
        <App />
    </AuthProvider>
  
  </StrictMode>,
)
