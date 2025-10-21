import React from 'react'

const Login = ({ onLogin }) => {
  return (
    <div className="login">
      <div className="login-card">
        <h2>🔐 Login</h2>
        <p>Bem-vindo ao Aurum Bank</p>
        <button onClick={() => onLogin({ name: 'Usuário Demo' })}>
          Entrar como Demo
        </button>
        <div className="demo-info">
          <p><strong>Para testar:</strong></p>
          <p>1. Inicie o MySQL: docker-compose up -d mysql</p>
          <p>2. Inicie o Python: cd python-services && python app.py</p>
          <p>3. Inicie o Spring Boot: cd backend && ./mvnw spring-boot:run</p>
        </div>
      </div>
    </div>
  )
}

export default Login
