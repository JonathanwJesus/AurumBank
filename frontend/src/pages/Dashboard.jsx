import React, { useState } from 'react'

const Dashboard = ({ user, correntistas, loading, onRefresh }) => {
  const [novoCorrentista, setNovoCorrentista] = useState({
    nome: '',
    cpf: '',
    email: ''
  })

  const cadastrarCorrentista = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:8080/api/correntistas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novoCorrentista)
      })
      
      const data = await response.json()
      
      if (data.success) {
        alert('Correntista cadastrado com sucesso!')
        setNovoCorrentista({ nome: '', cpf: '', email: '' })
        onRefresh()
      } else {
        alert('Erro: ' + data.error)
      }
    } catch (error) {
      alert('Erro ao cadastrar: ' + error.message)
    }
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>📊 Dashboard</h2>
        <button onClick={onRefresh} disabled={loading}>
          {loading ? 'Carregando...' : '🔄 Atualizar'}
        </button>
      </div>

      <div className="cards-container">
        <div className="card">
          <h3>Cadastrar Correntista</h3>
          <form onSubmit={cadastrarCorrentista} className="form">
            <input
              type="text"
              placeholder="Nome"
              value={novoCorrentista.nome}
              onChange={(e) => setNovoCorrentista({...novoCorrentista, nome: e.target.value})}
              required
            />
            <input
              type="text"
              placeholder="CPF"
              value={novoCorrentista.cpf}
              onChange={(e) => setNovoCorrentista({...novoCorrentista, cpf: e.target.value})}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={novoCorrentista.email}
              onChange={(e) => setNovoCorrentista({...novoCorrentista, email: e.target.value})}
            />
            <button type="submit">Cadastrar</button>
          </form>
        </div>

        <div className="card">
          <h3>Correntistas Cadastrados ({correntistas.length})</h3>
          {loading ? (
            <p>Carregando...</p>
          ) : (
            <div className="correntistas-list">
              {correntistas.map(correntista => (
                <div key={correntista.id} className="correntista-item">
                  <strong>{correntista.nome}</strong>
                  <div>CPF: {correntista.cpf}</div>
                  <div>Email: {correntista.email}</div>
                </div>
              ))}
              {correntistas.length === 0 && (
                <p>Nenhum correntista cadastrado</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard