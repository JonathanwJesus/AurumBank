@echo off
echo 🏦 Iniciando Aurum Bank no Windows...

echo 📊 Iniciando MySQL...
docker-compose up -d mysql

timeout /t 10

echo 🐍 Iniciando Python API...
cd python-services
python -m venv venv
call venv\Scripts\activate
pip install -r requirements.txt
start cmd /k "python app.py"

echo ☕ Iniciando Spring Boot...
cd ..\backend
start cmd /k "mvnw.cmd spring-boot:run"

echo ⚛️  Iniciando Frontend...
cd ..\frontend
start cmd /k "npm install && npm run dev"

echo ✅ Todos os serviços estão sendo iniciados!
echo 📊 MySQL: localhost:3306
echo 🐍 Python: localhost:5000
echo ☕ Spring Boot: localhost:8080
echo ⚛️  Frontend: localhost:3000

pause