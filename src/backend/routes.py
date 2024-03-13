import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, Text, ForeignKey
from sqlalchemy.orm import relationship

current_dir = os.path.dirname(__file__)
database_uri = 'sqlite:///' + os.path.join(current_dir, '..', 'database', 'database.db')


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = database_uri
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
    nome_layout = Column(Text, nullable=False)

# Classe Compartment (compartimentos dentro de cada layout)

class Compartment(db.Model):
    __tablename__ = 'Compartment'
    id = Column(Integer, primary_key=True, autoincrement=True)
    nome_item = Column(Text, nullable=False)
    quantidade_item = Column(Integer, nullable=False)
    numero_caixa = Column(Integer, nullable=False)
    id_layout = Column(Integer, ForeignKey('Layout.id'), nullable=False)
    id_item = Column(Integer, nullable=False)
    layout = relationship("Layout")
    

# Rotas referentes às tabelas Compartment e Layout

# Rota adicionar novo compartimento ligado a um layout por id (Adquirido a partir da URL)

@app.route('/add_compartment/<int:id_layout>', methods=['POST'])
def add_compartment(id_layout):
    data = request.json 
    nome_item = data['nome_item']
    quantidade_item = data['quantidade_item']
    numero_caixa = data['numero_caixa']
    id_item = data['id_item']
    
    new_compartment = Compartment(nome_item=nome_item, quantidade_item=quantidade_item,
                        numero_caixa=numero_caixa, id_layout=id_layout, id_item=id_item)
    
    db.session.add(new_compartment)
    db.session.commit()
    
    return jsonify({'message': 'compartment added successfully'})

from flask import jsonify

# Rota para obter todos os compartimentos de acordo com o layout_id da url

@app.route('/get_compartments/<int:id_layout>', methods=['GET'])
def get_compartments(id_layout):
    compartments = Compartment.query.filter_by(id_layout=id_layout).all()
    if compartments:
        compartment_list = [{
            'id': compartment.id,
            'nome_item': compartment.nome_item,
            'quantidade_item': compartment.quantidade_item,
            'numero_caixa': compartment.numero_caixa,
            'id_item': compartment.id_item
        } for compartment in compartments]
        return jsonify(compartment_list)
    else:
        return jsonify({'message': 'No compartments found for the given layout ID'}), 404
    
# Rota para modificar um compartimento de acordo com a id do compartimento na url
    
@app.route('/modify_compartment/<int:id>', methods=['PUT', 'PATCH'])
def modify_compartment(id):
    compartment = Compartment.query.get(id)
    if not compartment:
        return jsonify({'message': 'Compartment not found'}), 404

    data = request.json
    for key, value in data.items():
        setattr(compartment, key, value)

    db.session.commit()
    return jsonify({'message': 'Comapartment modified successfully'})

# Rota para deletar um compartimento de acordo com o id da URL

@app.route('/delete_compartment/<int:id>', methods=['DELETE'])
def delete_compartment(id):
    compartment = Compartment.query.get(id)
    if not compartment:
        return jsonify({'message': 'Compartment not found'}), 404
    else:
        db.session.delete(compartment)
        db.session.commit()
        return jsonify({'message': 'Compartment deleted successfully'})
    
    
# Deletar LAYOUT + *TODOS* compartimentos relacionados ao layout

@app.route('/delete_layout/<int:id>', methods=['DELETE'])
def delete_layout(id):
    layout = Layout.query.get(id)
    if not layout:
        return jsonify({'message': 'Layout not found'}), 404
    db.session.delete(layout)

    compartments = Compartment.query.filter_by(id_layout=id).all()
    for compartment in compartments:
        db.session.delete(compartment)

    db.session.commit()
    return jsonify({'message': 'Layout and associated compartments deleted successfully'})

# Criar layout

@app.route('/add_layout', methods=['POST'])
def add_layout():
    data = request.json
    nome_layout = data['nome_layout']
    
    new_layout = Layout(nome_layout=nome_layout)
    
    db.session.add(new_layout)
    db.session.commit()
    
    return jsonify({'message': 'Layout added successfully'})

# Rota para obter todos os layouts existentes

@app.route('/get_layouts', methods=['GET'])
def get_layouts():
    layouts = Layout.query.all()

    layouts_list = [{
            'id_layout': layout.id,
            'nome_layout': layout.nome_layout,
        } for layout in layouts]
        
    return jsonify(layouts_list)


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
