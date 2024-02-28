import csv
import json
from serial.tools import list_ports
import inquirer
import pydobot  
from yaspin import yaspin

#home = (240.53, 0, 150.23, 0)
#remedio1 = (111.46, -294.44, -9.18, -70.86)
#remedio2 = (32.09, -296.95, -10.18, -83.83)
#remedio3 = (-31.74, -299.74, -10.18, -96.05)
#remedio4 = (-98.01, -295.91, -10.18, -108.33)
#remedio5 = (111.59, -217.81, -7.61, -62.87)
#remedio6 = (44.38, -210.17, -7.28, -78.08)
#remedio7 = (-24.8, -209.59, -8.17, -96.75)
#remedio8 = (-91.94, -212.67, -6.64, -113.38)

#destino1 = (106.46, 205.79, 43.29, 62.65)
#destino2 = (35.55, 217.71, 18.44, 80.73)
#destino3 = (-27.28, 215.22, 19.69, 97.22)
#destino4 = (-97.49, 213.63, 13.13, 114.53)
#destino5 = (110.93, 302.16, 12.63, 69.84)
#destino6 = (37.7, 301.52, 14.95, 82.87)
#destino7 = (-27.07, 305.53, 12.42, 95.06)
#destino8 = (-98.12, 301.37, 13.09, 108.03)

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
device.speed(30, 30)

caminho = []
destino = []

def __init__():
        # Move o robô para a posição home.
        spinner.start()
        device.move_to_J(home[0], home[1], home[2], home[3], wait=True)
        spinner.stop()
        return "Robô inicializado."

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

def casa():
        spinner.start()
        device.move_to_J(home[0], home[1], home[2], home[3], wait=True)
        spinner.stop()
        return "Robô retornou à posição inicial."

def ligar_ferramenta():
        device.suck(True)
        return "Ferramenta ligada."

def desligar_ferramenta(): #if ferramenta == true, desligar ferramenta (fazer isso depois)
        device.suck(False)
        return "Ferramenta desligada."

def mover():
        return "Robô movido para as posições desejadas."
def atual():
        return f"Posição atual do robô: {device.pose()}" 


def execute_comando(comando):
    match comando:
        case "home":
            spinner.start()
            device.move_to_J(home['x'], home['y'], home['z'], home['r'], wait=True)
            spinner.stop()
            return "Robô retornou à posição inicial."
        case "ligar_ferramenta":
            device.suck(True)
            return "Ferramenta ligada."
        case "desligar_ferramenta":
            device.suck(False)
            return "Ferramenta desligada."
        case "mover":
            acao1 = inquirer.prompt([inquirer.Text("acao1", message="Qual o remédio desejado?")])
            if acao1["acao1"] in ["remedio1", "remedio2", "remedio3", "remedio4", "remedio5", "remedio6", "remedio7", "remedio8"]:
                caminho.append(acao1["acao1"])
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
                        if posicao in remedios:
                            remedio = remedios[posicao]
                            spinner.start()
                            device.move_to_J(remedio['x'], remedio['y'], 55.64, remedio['r'], wait=True)
                            device.move_to_J(remedio['x'], remedio['y'], remedio['z'], remedio['r'], wait=True)
                            device.suck(True)
                            device.wait(200)
                            device.move_to_J(remedio['x'], remedio['y'], 55.64, remedio['r'], wait=True)
                            device.move_to_J(home['x'], home['y'], home['z'], home['r'], wait=True)
                            spinner.stop()
                        else:
                            return "Posição inválida."

                    for chegada in destino:
                        if chegada in destinos:
                            destino_coords = destinos[chegada]
                            spinner.start()
                            device.move_to_J(destino_coords['x'], destino_coords['y'], destino_coords['z'], destino_coords['r'], wait=True)
                            device.suck(False)
                            spinner.stop()
                        else:
                            return "Posição inválida."
                else:
                    return "Destino inválido."
                caminho.clear()
                destino.clear()
            else:
                return "Remédio inválido."
        case "posicao_atual":
            return f"Posição atual do robô: {device.pose()}"
        case _:
            return "Comando inválido."


if __name__ == "__main__":
    pontos_home, pontos_remedios, pontos_destinos = load_points_from_file('src/pontos.json')
    home = pontos_home
    remedios_import= {ponto['nome']: ponto['posicao'] for ponto in pontos_remedios}
    destinos_import = {ponto['nome']: ponto['posicao'] for ponto in pontos_destinos}
    if ligar_ferramenta() == "Ferramenta ligada.":
        while True:
            perguntas = [
                inquirer.List("comando", message="Escolha um comando", choices=["home", "ligar_ferramenta", "desligar_ferramenta", "mover", "posicao_atual", "sair"])
            ]
            resposta = inquirer.prompt(perguntas)
            if resposta["comando"] == "sair":
                break

            resultado = execute_comando(resposta["comando"])
            print(resultado)
    else:
         
         while True:
            perguntas = [
            inquirer.List("comando", message="Escolha um comando", choices=["home", "ligar_ferramenta", "mover", "posicao_atual", "sair"])
            ]

            resposta = inquirer.prompt(perguntas)

            if resposta["comando"] == "sair":
                break
            resultado = execute_comando(resposta["comando"])
            print(resultado)
