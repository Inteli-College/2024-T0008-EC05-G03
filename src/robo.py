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
#Posição das caixas é a 10cm da base do robô
#55.64 #tamanho de 4 bloquinhos no z = -10.18
remedio1 = (111.46, -294.44, -10.18, -70.86)
remedio2 = (32.09, -296.95, -10.18, -83.83)
remedio3 = (-31.74, -299.74, -10.18, -96.05)
remedio4 = (-98.01, -295.91, -10.18, -108.33)
remedio5 = (111.59, -217.81, -7.61, -62.87)
remedio6 = (44.38, -210.17, -7.28, -78.08)
remedio7 = (-24.8, -209.59, -8.17, -96.75)
remedio8 = (-91.94, -212.67, -6.64, -113.38)

destino1 = (106.46, 205.79, 43.29, 62.65)
destino2 = (35.55, 217.71, 18.44, 80.73)
destino3 = (-27.28, 215.22, 19.69, 97.22)
destino4 = (-97.49, 213.63, 13.13, 114.53)
destino5 = (110.93, 302.16, 12.63, 69.84)
destino6 = (37.7, 301.52, 14.95, 82.87)
destino7 = (-27.07, 305.53, 12.42, 95.06)
destino8 = (-98.12, 301.37, 13.09, 108.03)

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

# Fazer com que todos subam mais antes de deslocar o remedio
# Faz com que o robô pegue o remédio 1 e coloque no destino 1.
spinner.start()
robo.move_to_J(remedio1[0], remedio1[1], 55.64, remedio1[3], wait=True)
robo.move_to_J(remedio1[0], remedio1[1], remedio1[2], remedio1[3], wait=True)
robo.suck(True)
robo.wait(200)
robo.move_to_J(remedio1[0], remedio1[1], 55.64, remedio1[3], wait=True)
robo.move_to_J(home[0], home[1], home[2], home[3], wait=True)
robo.move_to_J(destino1[0], destino1[1], destino1[2], destino1[3], wait=True)
robo.suck(False)
robo.move_to_J(home[0], home[1], home[2], home[3], wait=True)
spinner.stop()

# Faz com que o robô pegue o remédio 2 e coloque no destino 2.
spinner.start()
robo.move_to_J(remedio2[0], remedio2[1], 55.64, remedio2[3], wait=True)
robo.move_to_J(remedio2[0], remedio2[1], remedio2[2], remedio2[3], wait=True)
robo.suck(True)
robo.wait(200)
robo.move_to_J(remedio2[0], remedio2[1], 55.64, remedio2[3], wait=True)
robo.move_to_J(home[0], home[1], home[2], home[3], wait=True)
robo.move_to_J(destino2[0], destino2[1], destino2[2], destino2[3], wait=True)
robo.suck(False)
robo.move_to_J(home[0], home[1], home[2], home[3], wait=True)
spinner.stop()

# Faz com que o robô pegue o remédio 3 e coloque no destino 3.
spinner.start()
robo.move_to_J(remedio3[0], remedio3[1], 55.64, remedio3[3], wait=True)
robo.move_to_J(remedio3[0], remedio3[1], remedio3[2], remedio3[3], wait=True)
robo.suck(True)
robo.wait(200)
robo.move_to_J(remedio3[0], remedio3[1], 55.64, remedio3[3], wait=True)
robo.move_to_J(home[0], home[1], home[2], home[3], wait=True)
robo.move_to_J(destino3[0], destino3[1], destino3[2], destino3[3], wait=True)
robo.suck(False)
robo.move_to_J(home[0], home[1], home[2], home[3], wait=True)
spinner.stop()

# Faz com que o robô pegue o remédio 4 e coloque no destino 4.
spinner.start()
robo.move_to_J(remedio4[0], remedio4[1], 55.64, remedio4[3], wait=True)
robo.move_to_J(remedio4[0], remedio4[1], remedio4[2], remedio4[3], wait=True)
robo.suck(True)
robo.wait(200)
robo.move_to_J(remedio4[0], remedio4[1], 55.64, remedio4[3], wait=True)
robo.move_to_J(home[0], home[1], home[2], home[3], wait=True)
robo.move_to_J(destino4[0], destino4[1], destino4[2], destino4[3], wait=True)
robo.suck(False)
robo.move_to_J(home[0], home[1], home[2], home[3], wait=True)
spinner.stop()

# Faz com que o robô pegue o remédio 5 e coloque no destino 5.
spinner.start()
robo.move_to_J(remedio5[0], remedio5[1], 55.64, remedio5[3], wait=True)
robo.move_to_J(remedio5[0], remedio5[1], remedio5[2], remedio5[3], wait=True)
robo.suck(True)
robo.wait(200)
robo.move_to_J(remedio5[0], remedio5[1], 55.64, remedio5[3], wait=True)
robo.move_to_J(home[0], home[1], home[2], home[3], wait=True)
robo.move_to_J(destino5[0], destino5[1], destino5[2], destino5[3], wait=True)
robo.suck(False)
robo.move_to_J(home[0], home[1], home[2], home[3], wait=True)
spinner.stop()

# Faz com que o robô pegue o remédio 6 e coloque no destino 6.
spinner.start()
robo.move_to_J(remedio6[0], remedio6[1], 55.64, remedio6[3], wait=True)
robo.move_to_J(remedio6[0], remedio6[1], remedio6[2], remedio6[3], wait=True)
robo.suck(True)
robo.wait(200)
robo.move_to_J(remedio6[0], remedio6[1], 55.64, remedio6[3], wait=True)
robo.move_to_J(home[0], home[1], home[2], home[3], wait=True)
robo.move_to_J(destino6[0], destino6[1], destino6[2], destino6[3], wait=True)
robo.suck(False)
robo.move_to_J(home[0], home[1], home[2], home[3], wait=True)
spinner.stop()

# Faz com que o robô pegue o remédio 7 e coloque no destino 7.
spinner.start()
robo.move_to_J(remedio7[0], remedio7[1], 55.64, remedio7[3], wait=True)
robo.move_to_J(remedio7[0], remedio7[1], remedio7[2], remedio7[3], wait=True)
robo.suck(True)
robo.wait(200)
robo.move_to_J(remedio7[0], remedio7[1], 55.64, remedio7[3], wait=True)
robo.move_to_J(home[0], home[1], home[2], home[3], wait=True)
robo.move_to_J(destino7[0], destino7[1], destino7[2], destino7[3], wait=True)
robo.suck(False)
robo.move_to_J(home[0], home[1], home[2], home[3], wait=True)
spinner.stop()

# Faz com que o robô pegue o remédio 8 e coloque no destino 8.
spinner.start()
robo.move_to_J(remedio8[0], remedio8[1], 55.64, remedio8[3], wait=True)
robo.move_to_J(remedio8[0], remedio8[1], remedio8[2], remedio8[3], wait=True)
robo.suck(True)
robo.wait(200)
robo.move_to_J(remedio8[0], remedio8[1], 55.64, remedio8[3], wait=True)
robo.move_to_J(home[0], home[1], home[2], home[3], wait=True)
robo.move_to_J(destino8[0], destino8[1], destino8[2], destino8[3], wait=True)
robo.suck(False)
robo.move_to_J(home[0], home[1], home[2], home[3], wait=True)
spinner.stop()

# Pega a posição atual do robô
posicao_atual = robo.pose()
print(f"Posição atual: {posicao_atual}")

# Fecha a conexão com o robô
robo.close()
