
from flask import request, jsonify, send_file, make_response, Blueprint
from werkzeug.utils import secure_filename
from io import StringIO
import csv
from .models import db, Layout, Compartment

main = Blueprint('main', __name__)

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
            'id_item': compartment.id_item
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
    id_item = data['id_item']
    
    new_compartment = Compartment(nome_item=nome_item, quantidade_item=quantidade_item,
                        numero_compartimento=numero_compartimento, id_layout=id_layout, id_item=id_item)
    
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
            'id_item': compartment.id_item
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
        cw.writerow(['id', 'id_item', 'nome_item', 'numero_compartimento', 'quantidade_item'])
        # Escrever dados
        for compartment in compartments:
            cw.writerow([
                compartment.id,
                compartment.id_item,
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
                id_item=row['id_item'],
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
            'id_layout': layout.id,
            'nome_layout': layout.nome_layout,
        } for layout in layouts]
        
    return jsonify(layouts_list)


