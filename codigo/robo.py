# robo.py

# Traz a ferramenta serial para apresentar quais portas estão disponíveis
from serial.tools import list_ports
import inquirer
import pydobot
from yaspin import yaspin

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
robo.move_to(247, 6, 146, 0, wait=True)
spinner.stop()

# Inicializa o efetuador do robô
spinner.start()
robo.suck(True)
# Adiciona um delay para o robô efetuar a operação
robo.wait(200)
spinner.stop()

# Move o robô para a posição (200, 200, 0)
spinner.start()
robo.move_to(200, 200, 0, 0, wait=True)
spinner.stop()

# Move o robô para a posição (0, 200, 0)
spinner.start()
robo.move_to(0, 200, 0, 0, wait=True)
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
