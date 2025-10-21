class Correntista:
    def __init__(self, id=None, nome="", cpf="", email="", telefone="", data_nascimento=None, endereco=""):
        self.id = id
        self.nome = nome
        self.cpf = cpf
        self.email = email
        self.telefone = telefone
        self.data_nascimento = data_nascimento
        self.endereco = endereco
    
    def to_dict(self):
        return {
            'id': self.id,
            'nome': self.nome,
            'cpf': self.cpf,
            'email': self.email,
            'telefone': self.telefone,
            'data_nascimento': str(self.data_nascimento) if self.data_nascimento else None,
            'endereco': self.endereco
        }