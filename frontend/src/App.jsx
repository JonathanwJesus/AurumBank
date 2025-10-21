import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'

function App() {
  const [user, setUser] = useState(null)
  const [correntistas, setCorrentistas] = useState([])
  const [loading, setLoading] = useState(false)

  const carregarCorrentistas = async () => {
    setLoading(true)
    try {
      const response = await fetch('http://localhost:8080/api/correntistas')
      const data = await response.json()
      setCorrentistas(data.data || [])
    } catch (error) {
      console.error('Erro ao carregar correntistas:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    carregarCorrentistas()
  }, [])

  return (
    <div className="app">
      <Header />
      
      <main className="main-content">
        {!user ? (
          <Login onLogin={setUser} />
        ) : (
          <Dashboard 
            user={user} 
            correntistas={correntistas} 
            loading={loading} 
            onRefresh={carregarCorrentistas} 
          />
        )}
      </main>
    </div>
  )
}

export default App