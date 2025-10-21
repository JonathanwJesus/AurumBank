#!/bin/bash

echo "🚀 Iniciando Ambiente de Desenvolvimento Aurum Bank..."

# Iniciar MySQL com Docker
echo "📊 Iniciando MySQL..."
docker-compose up -d mysql

# Aguardar MySQL ficar pronto
sleep 10

# Iniciar Python API
echo "🐍 Iniciando Python API..."
cd python-services
python -m venv venv
source venv/bin/activate  # No Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py &
PYTHON_PID=$!

cd ../backend

# Iniciar Spring Boot
echo "☕ Iniciando Spring Boot..."
./mvnw spring-boot:run &
SPRING_PID=$!

cd ../frontend

# Iniciar Frontend (se existir)
if [ -f "package.json" ]; then
    echo "⚛️  Iniciando Frontend..."
    npm install
    npm run dev &
    FRONTEND_PID=$!
fi

echo "✅ Todos os serviços estão sendo iniciados..."
echo "📊 MySQL: localhost:3306"
echo "🐍 Python: localhost:5000" 
echo "☕ Spring Boot: localhost:8080"
echo "⚛️  Frontend: localhost:3000"

# Manter script rodando
wait