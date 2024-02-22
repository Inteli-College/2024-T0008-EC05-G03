# robo.py

# Traz a ferramenta serial para apresentar quais portas estão disponíveis
from serial.tools import list_ports
import inquirer
import pydobot  
from yaspin import yaspin
import typer

# Traz o spinner para apresentar uma animação enquanto o robô está se movendo
spinner = yaspin(text="Processando...", color="yellow")

# Listas as portas seriais disponíveis
available_ports = list_ports.comports()


# Pede para o usuário escolher uma das portas disponíveis
porta_escolhida = inquirer.prompt([
    inquirer.List("porta", message="Escolha a porta serial", choices=[x.device for x in available_ports])
])["porta"]

# Cria uma instância do robô
robo = pydobot.Dobot(port=porta_escolhida, verbose=False)

# Define a velocidade e a aceleracao do robô
robo.speed(30, 30)

# Move o robô para a posição (200, 0, 0)
spinner.start()
robo.move_to_J(247, 6, 146, 0, wait=True)
spinner.stop()

X1 = inquirer.prompt([inquirer.Text("x1", message="Informe a coordenada X da localização desejada")])
Y1 = inquirer.prompt([inquirer.Text("y1", message="Informe a coordenada Y da localização desejada")])
Z1 = inquirer.prompt([inquirer.Text("z1", message="Informe a coordenada Z da localização desejada")])

# Converte as entradas para inteiros
x1 = int(X1["x1"])
y1 = int(Y1["y1"])
z1 = int(Z1["z1"])

# Move o robô para a posição desejada
spinner.start()
robo.move_to_J(x1, y1, z1, 0, wait=True)
spinner.stop()

# Inicializa o efetuador do robô
spinner.start()
robo.suck(True)
# Adiciona um delay para o robô efetuar a operação
robo.wait(200)
spinner.stop()

# Inicializa o efetuador do robô
spinner.start()
robo.suck(False)
# Adiciona um delay para o robô efetuar a operação
robo.wait(200)
spinner.stop()

# Pega a posição atual do robô
posicao_atual = robo.pose()
print(f"Posição atual: {posicao_atual}")

# Fecha a conexão com o robô
robo.close()
