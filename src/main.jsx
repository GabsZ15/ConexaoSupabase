import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Empresas from './Empresas.jsx'
import './Empresas.css'
import './App.css'

function MainApp() {
  const [pagina, setPagina] = useState('empresas')

  return (
    <StrictMode>
      <nav style={{
        display: 'flex',
        gap: '12px',
        justifyContent: 'center',
        marginBottom: '20px'
      }}>
        <button 
          style={{
            backgroundColor: pagina === 'empresas' ? '#1d4ed8' : '#64748b',
            boxShadow: pagina === 'empresas' ? '0 0 0 3px rgba(37, 99, 235, 0.3)' : 'none'
          }}
          onClick={() => setPagina('empresas')}
        >
          🏢 Empresas & Funcionários
        </button>
        <button 
          style={{
            backgroundColor: pagina === 'produtos' ? '#1d4ed8' : '#64748b',
            boxShadow: pagina === 'produtos' ? '0 0 0 3px rgba(37, 99, 235, 0.3)' : 'none'
          }}
          onClick={() => setPagina('produtos')}
        >
          📦 Produtos (Supabase)
        </button>
      </nav>

      {pagina === 'empresas' ? <Empresas /> : <App />}
    </StrictMode>
  )
}

createRoot(document.getElementById('root')).render(<MainApp />)
