
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, Text, ForeignKey
from sqlalchemy.orm import relationship

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////Users/macbook/Documents/GitHub/mod5/src/db/database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

CORS(app)

# Classe de Usuários

class Users(db.Model):
    __tablename__ = 'Users'
    id = Column(Integer, primary_key=True, autoincrement=True, unique=True)
    usuario = Column(Text, nullable=False)
    senha = Column(Text, nullable=False)
    nivel_prioridade = Column(Integer, nullable=False)
    
# Classe Layout

class Layout(db.Model):
    __tablename__ = 'Layout'
    id = Column(Integer, primary_key=True)
    layout = Column(Text, nullable=False)

# Classe Scheme

class Scheme(db.Model):
    __tablename__ = 'Scheme'
    id = Column(Integer, primary_key=True, autoincrement=True)
    nome_remedio = Column(Text, nullable=False)
    quantidade_remedio = Column(Integer, nullable=False)
    numero_caixa = Column(Integer, nullable=False)
    id_layout = Column(Integer, ForeignKey('Layout.id'), nullable=False)
    id_remedio = Column(Integer, nullable=False)
    layout = relationship("Layout")
    

# Rotas referentes ao Schema e Layout

# Rota adicionar novo Schema referente ao id do layout (Adquirido a partir da URL)

@app.route('/add_scheme/<int:id_layout>', methods=['POST'])
def add_scheme(id_layout):
    data = request.json 
    nome_remedio = data['nome_remedio']
    quantidade_remedio = data['quantidade_remedio']
    numero_caixa = data['numero_caixa']
    id_remedio = data['id_remedio']
    
    new_scheme = Scheme(nome_remedio=nome_remedio, quantidade_remedio=quantidade_remedio,
                        numero_caixa=numero_caixa, id_layout=id_layout, id_remedio=id_remedio)
    
    db.session.add(new_scheme)
    db.session.commit()
    
    return jsonify({'message': 'Scheme added successfully'})

from flask import jsonify

# Rota adquirir os schemas de acordo com todos o layout_id da url

@app.route('/get_schemes/<int:id_layout>', methods=['GET'])
def get_schemes(id_layout):
    schemes = Scheme.query.filter_by(id_layout=id_layout).all()
    if schemes:
        scheme_list = [{
            'id': scheme.id,
            'nome_remedio': scheme.nome_remedio,
            'quantidade_remedio': scheme.quantidade_remedio,
            'numero_caixa': scheme.numero_caixa,
            'id_remedio': scheme.id_remedio
        } for scheme in schemes]
        return jsonify(scheme_list)
    else:
        return jsonify({'message': 'No schemes found for the given layout ID'}), 404
    
# Rota para modificar um schema de acordo com a id do schema na url
    
@app.route('/modify_scheme/<int:id>', methods=['PUT', 'PATCH'])
def modify_scheme(id):
    scheme = Scheme.query.get(id)
    if not scheme:
        return jsonify({'message': 'Scheme not found'}), 404

    data = request.json
    for key, value in data.items():
        setattr(scheme, key, value)

    db.session.commit()
    return jsonify({'message': 'Scheme modified successfully'})

# Rota para deletar schema de acordo com o id da URL

@app.route('/delete_scheme/<int:id>', methods=['DELETE'])
def delete_scheme(id):
    scheme = Scheme.query.get(id)
    if not scheme:
        return jsonify({'message': 'Scheme not found'}), 404
    else:
        db.session.delete(scheme)
        db.session.commit()
        return jsonify({'message': 'Scheme deleted successfully'})
    
    
# Deletar LAYOUT + *TODOS* Schemas relacionados

@app.route('/delete_layout/<int:id>', methods=['DELETE'])
def delete_layout(id):
    layout = Layout.query.get(id)
    if not layout:
        return jsonify({'message': 'Layout not found'}), 404
    db.session.delete(layout)

    schemes = Scheme.query.filter_by(id_layout=id).all()
    for scheme in schemes:
        db.session.delete(scheme)

    db.session.commit()
    return jsonify({'message': 'Layout and associated schemes deleted successfully'})

# Criar layout

@app.route('/add_layout', methods=['POST'])
def add_layout():
    data = request.json
    layout = data['layout']
    
    new_layout = Layout(layout=layout)
    
    db.session.add(new_layout)
    db.session.commit()
    
    return jsonify({'message': 'Layout added successfully'})


# Rotas referentes ao Usuário

@app.route('/add_user', methods=['POST'])
def add_user():
    data = request.json
    usuario = data['usuario']
    senha = data['senha']
    nivel_prioridade = data['nivel_prioridade']
    
    new_user = Users(usuario=usuario, senha=senha, nivel_prioridade=nivel_prioridade)
    
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({'message': 'User added successfully'})

@app.route('/get_users', methods=['GET'])
def get_users():
    users = Users.query.all()
    if users:
        user_list = [{
            'id': user.id,
            'usuario': user.usuario,
            'senha': user.senha,
            'nivel_prioridade': user.nivel_prioridade
        } for user in users]
        return jsonify(user_list)
    else:
        return jsonify({'message': 'No users found'}), 404
    

@app.route('/update_user/<int:id>', methods=['PUT', 'PATCH'])
def update_user(id):
    user = Users.query.get(id)
    if not user:
        return jsonify({'message': 'User not found'}), 404

    data = request.json
    allowed_fields = {'usuario', 'senha'}

    if not all(key in allowed_fields for key in data.keys()):
        return jsonify({'message': 'Only username and password fields are allowed'}), 400

    for key, value in data.items():
        setattr(user, key, value)

    db.session.commit()
    return jsonify({'message': 'User updated successfully'})

@app.route('/delete_user/<int:id>', methods=['DELETE'])
def delete_user(id):
    user = Users.query.get(id)
    if not user:
        return jsonify({'message': 'User not found'}), 404
    else:
        db.session.delete(user)
        db.session.commit()
        return jsonify({'message': 'User deleted successfully'})

if __name__ == '__main__':
    app.run(debug=True)
