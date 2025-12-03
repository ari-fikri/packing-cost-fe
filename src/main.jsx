// src/main.jsx
import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './app.jsx'
import { AuthProvider } from './auth.jsx'
import './styles.css'

const base = process.env.NODE_ENV === "production"
  ? "/packing-cost-fe/"
  : "/";

createRoot(document.getElementById('root')).render(
<React.StrictMode>
  <BrowserRouter basename={base}>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
</React.StrictMode>
)