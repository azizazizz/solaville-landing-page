import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const root = document.getElementById('root')
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// HTML hasil prerender hanya di-hydrate bila memang untuk alamat ini. Di rute lain (halaman alur
// pemesanan, atau alamat tak dikenal yang dilayani index.html lewat rewrite) isinya dibuang dan dirender dari nol,
// supaya tidak terjadi hydration mismatch.
const path = location.pathname.replace(/\/+$/, '') || '/'
if (root.dataset.prerendered === path) {
  hydrateRoot(root, app)
} else {
  root.replaceChildren()
  createRoot(root).render(app)
}
