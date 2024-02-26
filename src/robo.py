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

home = (240.53, 0, 150.23, 0)
#55.64
remedio1 = (346.51, 57.66, -35.85, 9.45)
remedio2 = (336.84, -8.5, -21.46, -1.44)
remedio3 = (329.34, -71.42, -21.63, -12.24)
remedio4 = (324.91, -142.74, -20.37, -23.72)
remedio5 = (260.07, 67.16, -23.11, 14.48)
remedio6 = (257.25, 3.19, -13.3, 0.71)
remedio7 = (251.22, -67.73, -15.85, -15.09)
remedio8 = (241.53, -132.68, -15.22, -28.78)

destino1 = (3.85, -295.69, 6.37, -89.25)
destino2 = (-66.26, -288.2, 6.37, -102.95)
destino3 = (-133, -273.53, 6.37, -115.93)
destino4 = (-200.93, -276.96, 6.37, -125.96)
destino5 = (7.77, -202.01, 6.37, -87.8)
destino6 = (-61.54, -206.96, 6.37, -106.56)
destino7 = (-131.09, -206.83, 6.37, -122.37)
destino8 = (-189.24, -196.85, 6.37, -133.87)

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
robo.move_to_J(home[0], home[1], home[2], home[3], wait=True)
spinner.stop()

#X1 = inquirer.prompt([inquirer.Text("x1", message="Informe a coordenada X da localização desejada")])
#Y1 = inquirer.prompt([inquirer.Text("y1", message="Informe a coordenada Y da localização desejada")])
#Z1 = inquirer.prompt([inquirer.Text("z1", message="Informe a coordenada Z da localização desejada")])

# Converte as entradas para inteiros
#x1 = int(X1["x1"])
#y1 = int(Y1["y1"])
#z1 = int(Z1["z1"])

# Move o robô para a posição desejada
spinner.start()
robo.move_to_J(remedio1[0], remedio1[1], 55.64, remedio1[3], wait=True)
robo.move_to(remedio1[0], remedio1[1], -9.34, remedio1[3], wait=True)
robo.suck(True)
robo.move_to_J(home[0], home[1], home[2], home[3], wait=True)
robo.move_to_J(destino1[0], destino1[1], destino1[2], destino1[3], wait=True)
robo.suck(False)
robo.move_to_J(home[0], home[1], home[2], home[3], wait=True)
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
