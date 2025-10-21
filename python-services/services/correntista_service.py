from entities.correntista import Correntista

class CorrentistaService:
    def __init__(self):
        self.correntistas = []
        self.next_id = 1
    
    def cadastrar(self, data):
        # Validação básica
        if not data.get('cpf') or not data.get('nome'):
            raise ValueError("CPF e nome são obrigatórios")
        
        # Verifica se CPF já existe
        for correntista in self.correntistas:
            if correntista.cpf == data['cpf']:
                raise ValueError("CPF já cadastrado")
        
        # Cria novo correntista
        novo_correntista = Correntista(
            id=self.next_id,
            nome=data['nome'],
            cpf=data['cpf'],
            email=data.get('email', ''),
            telefone=data.get('telefone', ''),
            data_nascimento=data.get('data_nascimento'),
            endereco=data.get('endereco', '')
        )
        
        self.correntistas.append(novo_correntista)
        self.next_id += 1
        
        return novo_correntista.to_dict()
    
    def listar_todos(self):
        return [correntista.to_dict() for correntista in self.correntistas]
    
    def buscar_por_cpf(self, cpf):
        for correntista in self.correntistas:
            if correntista.cpf == cpf:
                return correntista.to_dict()
        return None
    