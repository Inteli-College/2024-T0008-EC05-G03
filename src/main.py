import csv
import json
from serial.tools import list_ports
import inquirer
import pydobot  
from yaspin import yaspin

# Traz o spinner para apresentar uma animação enquanto o robô está se movendo
spinner = yaspin(text="Processando...", color="yellow")

# Listas as portas seriais disponíveis
available_ports = list_ports.comports()
porta_escolhida = inquirer.prompt([
    inquirer.List("porta", message="Escolha a porta serial", choices=[x.device for x in available_ports])
])["porta"]
# Cria uma instância do robô
device = pydobot.Dobot(port=porta_escolhida, verbose=False)

# Define a velocidade e a aceleracao do robô
device.speed(100, 100)

caminho = []
destino = []
choices = ["home", "mover", "posicao_atual", "sair"]

def load_points_from_file(file_path):
    # Lógica para carregar pontos do arquivo
    with open(file_path, 'r') as file:
        if file_path.endswith('.json'):
            data = json.load(file)
            return data['home'], data['remedios'], data['destinos']  # Retorna os pontos dos remédios e destinos
        elif file_path.endswith('.csv'):
            reader = csv.reader(file)
            data = [(float(row[0]), float(row[1])) for row in reader]
            return data
        else:
            raise ValueError("Formato de arquivo não suportado")

def ligar_ferramenta():
        device.suck(True)
        choices.remove("ligar_ferramenta")
        choices.insert(1, "desligar_ferramenta")
        return "Ferramenta ligada."

def desligar_ferramenta():
        device.suck(False)
        choices.remove("desligar_ferramenta")
        choices.insert(1, "ligar_ferramenta")
        return "Ferramenta desligada."


def execute_comando(comando):
    match comando:
        case "home":
            spinner.start()
            device.move_to_J(home['x'], home['y'], home['z'], home['r'], wait=True)
            spinner.stop()
            return "Robô retornou à posição inicial."
        case "ligar_ferramenta":
            ligar_ferramenta()
            return "Ferramenta ligada."
        case "desligar_ferramenta":
            desligar_ferramenta()
            return "Ferramenta desligada."
        case "mover":
            print("Medicamentos disponíveis: remedio1, remedio2, remedio3, remedio4, remedio5, remedio6, remedio7, remedio8")
            acao1 = inquirer.prompt([inquirer.Text("acao1", message="Qual o remédio desejado?")])
            if acao1["acao1"] in ["remedio1", "remedio2", "remedio3", "remedio4", "remedio5", "remedio6", "remedio7", "remedio8"]:
                caminho.append(acao1["acao1"])
                print("Locais disponíveis: destino1, destino2, destino3, destino4, destino5, destino6, destino7, destino8")
                acao2 = inquirer.prompt([inquirer.Text("acao2", message="Qual o destino desejado?")])
                destinos = {
                    "destino1": destinos_import['destino1'],
                    "destino2": destinos_import['destino2'],
                    "destino3": destinos_import['destino3'],
                    "destino4": destinos_import['destino4'],
                    "destino5": destinos_import['destino5'],
                    "destino6": destinos_import['destino6'],
                    "destino7": destinos_import['destino7'],
                    "destino8": destinos_import['destino8']
                }

                if acao2["acao2"] in destinos:
                    destino.append(acao2["acao2"])
                    remedios = {
                        "remedio1": remedios_import['remedio1'],
                        "remedio2": remedios_import['remedio2'],
                        "remedio3": remedios_import['remedio3'],
                        "remedio4": remedios_import['remedio4'],
                        "remedio5": remedios_import['remedio5'],
                        "remedio6": remedios_import['remedio6'],
                        "remedio7": remedios_import['remedio7'],
                        "remedio8": remedios_import['remedio8']
                    }

                    for posicao in caminho:
                        remedio = remedios[posicao]
                        spinner.start()
                        device.move_to_J(remedio['x'], remedio['y'], 55.64, remedio['r'], wait=True)
                        device.move_to(remedio['x'], remedio['y'], remedio['z'], remedio['r'], wait=True)
                        device.suck(True)
                        device.wait(200)
                        device.move_to(remedio['x'], remedio['y'], 55.64, remedio['r'], wait=True)
                        device.move_to_J(home['x'], home['y'], home['z'], home['r'], wait=True)
                        spinner.stop()
                        caminho.clear()
                        for chegada in destino:
                            destino_coords = destinos[chegada]
                            spinner.start()
                            device.move_to_J(destino_coords['x'], destino_coords['y'], destino_coords['z'], destino_coords['r'], wait=True)
                            device.suck(False)
                            spinner.stop()
                            destino.clear()

                else:
                    caminho.clear()
                    return "Destino inválido."
            else:
                caminho.clear()
                return "Remédio inválido."
        case "posicao_atual":
            return f"Posição atual do robô: {device.pose()}"
        case _:
            return "Comando inválido."


if __name__ == "__main__":
    pontos_home, pontos_remedios, pontos_destinos = load_points_from_file('src/pontos.json')
    home = pontos_home
    choices.insert(1, "ligar_ferramenta")
    remedios_import= {ponto['nome']: ponto['posicao'] for ponto in pontos_remedios}
    destinos_import = {ponto['nome']: ponto['posicao'] for ponto in pontos_destinos}
    device.move_to_J(home['x'], home['y'], home['z'], home['r'], wait=True)
    while True:
        perguntas = [
            inquirer.List("comando", message="Escolha um comando", choices=choices)
        ]
        resposta = inquirer.prompt(perguntas)
        if resposta["comando"] == "sair":
                break

        resultado = execute_comando(resposta["comando"])
        print(resultado)