from flask import Flask, request, jsonify
from flask_cors import CORS
from services.correntista_service import CorrentistaService
from services.conta_service import ContaService
import os

app = Flask(__name__)
CORS(app)

# Inicializar serviços
correntista_service = CorrentistaService()
conta_service = ContaService()

@app.route('/api/python/health', methods=['GET'])
def health_check():
    return jsonify({
        "status": "Python API está funcionando!", 
        "port": 5000,
        "message": "Conectado ao Aurum Bank"
    })

@app.route('/api/python/correntistas', methods=['GET', 'POST'])
def correntistas():
    if request.method == 'GET':
        correntistas = correntista_service.listar_todos()
        return jsonify({
            "success": True,
            "data": correntistas,
            "total": len(correntistas)
        })
    
    elif request.method == 'POST':
        try:
            data = request.get_json()
            correntista = correntista_service.cadastrar(data)
            return jsonify({
                "success": True,
                "data": correntista,
                "message": "Correntista cadastrado com sucesso"
            })
        except Exception as e:
            return jsonify({"success": False, "error": str(e)}), 400

@app.route('/api/python/contas', methods=['POST'])
def abrir_conta():
    try:
        data = request.get_json()
        conta = conta_service.abrir_conta(data)
        return jsonify({
            "success": True,
            "data": conta,
            "message": "Conta aberta com sucesso"
        })
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 400

if __name__ == '__main__':
    print("🚀 Servidor Python iniciado: http://localhost:5000")
    print("📊 Health Check: http://localhost:5000/api/python/health")
    print("👥 Correntistas: http://localhost:5000/api/python/correntistas")
    app.run(host='0.0.0.0', port=5000, debug=True)