
from flask import request, jsonify, send_file, make_response, Blueprint, session
from flask_session import Session
from werkzeug.utils import secure_filename
from io import StringIO
import csv
from .models import db, Layout, Compartment, Users, UserLogin, RefillCompartment
import sys
import os
from datetime import datetime
import pytz

spTmz = pytz.timezone('America/Sao_Paulo')


sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))

from roboClass import Robo

main = Blueprint('main', __name__)

def utc_to_sp_time(utc_dt):
    if utc_dt is None:
        return None
    sp_tz = pytz.timezone('America/Sao_Paulo')
    return utc_dt.replace(tzinfo=pytz.utc).astimezone(sp_tz)

state = False


# Rotas referentes a tabela RefillCompartment

@main.route('/get_refill_compartment/<int:id_layout>', methods=['GET'])
def get_refill_compartment(id_layout):
    compartments = RefillCompartment.query.filter_by(id_layout=id_layout).all()
    if compartments:
        compartment_list = [{
            'id': compartment.id,
            'nome_item': compartment.nome_item,
            'quantidade_item': compartment.quantidade_item,
            'numero_compartimento': compartment.numero_compartimento,
            'id_layout': compartment.id_layout
        } for compartment in compartments]
        return jsonify(compartment_list)
    else:
        return jsonify({'message': 'No compartments found for the given layout ID'}), 404
    
@main.route('/add_refill_compartment/<int:id_layout>', methods=['POST'])
def add_refill_compartment(id_layout):
    data = request.json
    nome_item = data['nome_item']
    quantidade_item = data['quantidade_item']
    numero_compartimento = data['numero_compartimento']
    
    new_compartment = RefillCompartment(nome_item=nome_item, quantidade_item=quantidade_item,
                        numero_compartimento=numero_compartimento, id_layout=id_layout)
    
    db.session.add(new_compartment)
    db.session.commit()
    
    return jsonify({'message': 'compartment added successfully'})

@main.route('/modify_refill_compartment/<int:id>', methods=['PUT', 'PATCH'])
def modify_refill_compartment(id):
    compartment = RefillCompartment.query.get(id)
    if not compartment:
        return jsonify({'message': 'Compartment not found'}), 404

    data = request.json
    for key, value in data.items():
        setattr(compartment, key, value)

    db.session.commit()
    return jsonify({'message': 'Compartment modified successfully'})


@main.route('/delete_refill_compartment/<int:id>', methods=['DELETE'])
def delete_refill_compartment(id):
    compartment = RefillCompartment.query.get(id)
    if not compartment:
        return jsonify({'message': 'Compartment not found'}), 404
    else:
        db.session.delete(compartment)
        db.session.commit()
        return jsonify({'message': 'Compartment deleted successfully'})
# Rotas referentes às tabelas Compartment e Layout

# Rota para puxar nome e quantidade de todos os remédios da tabela Compartment
@main.route('/get_all_compartments_medication', methods=['GET'])
def get_all_compartments_medication():
    compartments = Compartment.query.all()
    if compartments:
        compartment_list = [{
            'id': compartment.id,
            'nome_item': compartment.nome_item,
            'quantidade_item': compartment.quantidade_item,
        } for compartment in compartments]
        return jsonify(compartment_list)
    else:
        return jsonify({'message': 'No compartments found'}), 404

# Rota adicionar novo compartimento ligado a um layout por id (Adquirido a partir da URL)

@main.route('/add_compartment/<int:id_layout>', methods=['POST'])
def add_compartment(id_layout):
    data = request.json 
    nome_item = data['nome_item']
    quantidade_item = data['quantidade_item']
    numero_compartimento = data['numero_compartimento']
    
    new_compartment = Compartment(nome_item=nome_item, quantidade_item=quantidade_item,
                        numero_compartimento=numero_compartimento, id_layout=id_layout)
    
    db.session.add(new_compartment)
    db.session.commit()
    
    return jsonify({'message': 'compartment added successfully'})



# Rota para obter todos os compartimentos de acordo com o layout_id da url

@main.route('/get_compartments/<int:id_layout>', methods=['GET'])
def get_compartments(id_layout):
    compartments = Compartment.query.filter_by(id_layout=id_layout).all()
    if compartments:
        compartment_list = [{
            'id': compartment.id,
            'nome_item': compartment.nome_item,
            'quantidade_item': compartment.quantidade_item,
            'numero_compartimento': compartment.numero_compartimento,
        } for compartment in compartments]
        return jsonify(compartment_list)
    else:
        return jsonify({'message': 'No compartments found for the given layout ID'}), 404
    
@main.route('/download_compartment/<int:id_layout>', methods=['GET'])
def download_compartment(id_layout):
    # Adquirir o nome do layout através do id do layout
    layout = Layout.query.filter_by(id=id_layout).first()
    
    # Se não  haver layout
    if layout is None:
        return jsonify({'message': 'Layout not found'}), 404
    
    nome_layout = layout.nome_layout  
    
    # Filtrar todos as linhas da tabela compartment com o id layout igual ao id_layout da URL
    compartments = Compartment.query.filter_by(id_layout=id_layout).all()
    if compartments:
        # Criar um CSV na memória
        si = StringIO()
        cw = csv.writer(si)
        # Escrever o "Header"
        cw.writerow(['id', 'nome_item', 'numero_compartimento', 'quantidade_item'])
        # Escrever dados
        for compartment in compartments:
            cw.writerow([
                compartment.id,
                compartment.nome_item,
                compartment.numero_compartimento,
                compartment.quantidade_item
            ])
        
        # Resetar o ponteiro da memória do arquivo para o início
        si.seek(0)
        
        # Formatar o nome do layout para adicionar ao arquivo
        formatted_layout_name = nome_layout.replace(" ", "_")
        filename = f"{formatted_layout_name}.csv"
        
        output = make_response(si.getvalue())
        output.headers["Content-Disposition"] = f"attachment; filename={filename}"
        output.headers["Content-type"] = "text/csv"
        return output
    else:
        return jsonify({'message': 'No compartments found for the given layout ID'}), 404
    
# Rota para ler arquivo CSV e adicionar a base de dados

@main.route('/upload_compartment', methods=['POST'])
def upload_compartment():
    if 'file' not in request.files:
        return jsonify({'message': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'message': 'No selected file'}), 400
    if file:
        filename = secure_filename(file.filename)

        # Pegar o nome do layout através do nome do arquivo
        layout_name = filename.rsplit('.', 1)[0]

        # Criar uma nova coluna na tabela Layout
        new_layout = Layout(nome_layout=layout_name)
        db.session.add(new_layout)
        db.session.flush()
        
        # Ler o arquivo CSV
        stream = StringIO(file.stream.read().decode("UTF8"), newline=None)
        csv_reader = csv.DictReader(stream)
        
        # Adicionar novas linhas na tabela Compartment
        for row in csv_reader:
            new_compartment = Compartment(
                nome_item=row['nome_item'],
                quantidade_item=row['quantidade_item'],
                numero_compartimento=row['numero_compartimento'],
                id_layout=new_layout.id  # Associate with the new layout
            )
            db.session.add(new_compartment)
        
        db.session.commit()  # Commit all changes to the database
        
        return jsonify({'message': 'File uploaded and processed successfully'}), 201
    
    return jsonify({'message': 'Error processing file'}), 400

    
# Rota para modificar um compartimento de acordo com a id do compartimento na url
    
@main.route('/modify_compartment/<int:id>', methods=['PUT', 'PATCH'])
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

@main.route('/delete_compartment/<int:id>', methods=['DELETE'])
def delete_compartment(id):
    compartment = Compartment.query.get(id)
    if not compartment:
        return jsonify({'message': 'Compartment not found'}), 404
    else:
        db.session.delete(compartment)
        db.session.commit()
        return jsonify({'message': 'Compartment deleted successfully'})
    
# Deletar LAYOUT + *TODOS* compartimentos relacionados ao layout

@main.route('/delete_layout/<int:id>', methods=['DELETE'])
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

@main.route('/add_layout', methods=['POST'])
def add_layout():
    data = request.json
    nome_layout = data['nome_layout']
    
    new_layout = Layout(nome_layout=nome_layout)
    
    db.session.add(new_layout)
    db.session.commit()
    
    return jsonify({'message': 'Layout added successfully'})

# Rota para obter todos os layouts existentes

@main.route('/get_layouts', methods=['GET'])
def get_layouts():
    layouts = Layout.query.all()

    layouts_list = [{
            'id': layout.id,
            'nome_layout': layout.nome_layout,
        } for layout in layouts]
        
    return jsonify(layouts_list)


# Rotas referentes ao robo

@main.route('/robo_position', methods=['GET'])
def get_pos():
    try: 
        robo = Robo([[]],[[]])
        position = robo.posicao()
        
        position_data = {
            'x': round(position[0],2),
            'y': round(position[1],2),
            'z': round(position[2],2),
            'r': round(position[3],2)
        }
        
        robo.fechar()
        return jsonify(position_data)
    
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500
    
@main.route('/home', methods=['GET'])
def home():
    try:
        robo = Robo([[]],[[]])
        robo.inicial()
        robo.fechar()
        return jsonify({'success': True, 'message': 'Robo moved to home position'})
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500
    
@main.route('/actuator', methods=['GET'])
def actuator():
    try:
        global state
        robo = Robo([[]],[[]])
        state = not state
        robo.ferramenta(state)
        robo.fechar()
        return jsonify({'success': True, 'message': 'Actuator activated'})
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500
    
@main.route('/refill/<int:mode>', methods=['POST'])
def refill(mode):
        try:
            global state
            data = request.get_json()
            
            reabastecimento_dict = data.get('reabastecimento', {})
            gaveta_dict = data.get('gaveta', {})
            
            m1 = [[int(key), value['nome'], value['qtd']] for key, value in reabastecimento_dict.items()]
            m2 = [[int(key), value['nome'], value['qtd']] for key, value in gaveta_dict.items()]


            if not m1 or not m2:
                return jsonify({"error": "Missing m1 or m2 in the request"}), 400

            robo = Robo(m1, m2)
            robo.reabastecer(mode)
            state = False
            robo.fechar()
            return jsonify({"message": "Reabastecimento completed successfully with mode {}".format(mode)}), 200

        except Exception as e:
            return jsonify({"error": str(e)}), 500
        
    # Rotas referentes ao user/login
        
@main.route('/login_user', methods=['POST', 'GET'])
def login_user():
    if request.method == 'POST':
        username = request.json['username']
        password = request.json['password']
        user = Users.query.filter_by(username=username).first()
        
        if user and user.check_password(password):
            new_login = UserLogin(user_id=user.id)
            session['username'] = username
            db.session.add(new_login)
            db.session.commit()
            
            return jsonify({'message': f'User {username} logged in successfully'})
        else:
            return jsonify({'error': 'Invalid username or password'}), 401
    else:
        # RETORNAR A PAGINA DE LOGIN AQUI 
        return jsonify({'error': 'Method not allowed'}), 405

   
    
@main.route('/logout_user', methods=['POST', 'GET'])
def logout_user():
    if request.method == 'POST':
       # CHECAR SE O USUARIO ESTA LOGADO
       if not session.get("username"):
           # REDIRECIONAR PAG DE LOGIN
           return jsonify({'error': 'User not logged in'}), 401
       else:
            username = request.json['username']
            user = Users.query.filter_by(username=username).first()
            if user:
                last_login = UserLogin.query.filter_by(user_id=user.id).order_by(UserLogin.login_time.desc()).first()
                if last_login and last_login.logout_time is None:
                    last_login.logout_time = datetime.now(spTmz)
                    session.pop('username', default=None)
                    db.session.commit()
                    
                    return jsonify({'message': f'User {username} logged out successfully'})
                else:
                    return jsonify({'error': 'User not logged in or already logged out'}), 400
            else:
                return jsonify({'error': 'User not found'}), 404
    else:
        # RETORNAR A PAGINA DE LOGOUT AQUI
        return jsonify({'error': 'Method not allowed'}), 405


@main.route('/get_users', methods=['GET'])
def get_users():
    users = Users.query.all()
    users_data = [{
        'username': user.username,
        'logins': [{
            'login_time': login.login_time.isoformat() if login.login_time else None,
            'logout_time': login.logout_time.isoformat() if login.logout_time else None,
        } for login in user.logins]
    } for user in users]
    return jsonify(users_data)

    
@main.route('/register_user', methods=['POST'])
def register_user():
    username = request.json['username']
    password = request.json['password']
    if Users.query.filter_by(username=username).first():
        return jsonify({'error': 'Username already exists'}), 400

    new_user = Users(username=username)
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User registered successfully'}), 201

@main.route('/delete_user', methods=['DELETE'])
def delete_user():
    username = request.json['username']
    user = Users.query.filter_by(username=username).first()
    if user:
        db.session.delete(user)
        db.session.commit()
        return jsonify({'message': f'User {username} deleted successfully'})
    else:
        return jsonify({'error': 'User not found'}), 404
    
@main.route('/update_user', methods=['PUT'])
def update_user():
    username = request.json['username']
    new_password = request.json.get('new_password', None)

    user = Users.query.filter_by(username=username).first()
    if user:
        if new_password:
            user.set_password(new_password)
            db.session.commit()
            return jsonify({'message': 'User information updated successfully'})
        else:
            return jsonify({'error': 'No new information provided'}), 400
    else:
        return jsonify({'error': 'User not found'}), 404