import pydobot
from serial.tools import list_ports
# Mandar para a posição home
def home():
    #m_lite.set_home()
    print("casa")
    menu()
# Ligar a ferramenta (atuador)
def ligarFerramenta():
    if head == "gripper":
        print("gripClose")
        #m_lite.set_endeffector_gripper(enable=True, on=True)
    else:
        print("succStart")
        #m_lite.set_endeffector_suctioncup(enable=True, on=True)
    menu()
# Desligar a ferramenta (atuador)
def desligarFerramenta():
    if head == "gripper":
        print("gripOpen")
        #m_lite.set_endeffector_gripper(enable=True, on=False)
    else:
        print("succOff")
        #m_lite.set_endeffector_suctioncup(enable=True, on=False)
    menu()
def quit():
    exit(1)
def obter_posicao_atual():
    # Implementa a função para obter a posição atual do robô
    # pos = m_lite.pose()
    # print(f"Posição Atual: X={pos[0]}, Y={pos[1]}, Z={pos[2]}")
    print("Posição Atual: X=0, Y=0, Z=0")  # Simulação, substitua pelos valores reais
    menu()
def mover_eixo(axis, distance):
    # Implementa a função para mover o robô em um eixo específico (x, y ou z)
    if axis.lower() == 'x':
        # Mover na direção X
        # m_lite.move_to(x=current_x + distance, y=current_y, z=current_z)
        print(f"Moveu {distance} unidades em X.")
    elif axis.lower() == 'y':
        # Mover na direção Y
        # m_lite.move_to(x=current_x, y=current_y + distance, z=current_z)
        print(f"Moveu {distance} unidades em Y.")
    elif axis.lower() == 'z':
        # Mover na direção Z
        # m_lite.move_to(x=current_x, y=current_y, z=current_z + distance)
        print(f"Moveu {distance} unidades em Z.")
    else:
        print("Eixo inválido.")
    menu()
def menu():
    print("\nO que você quer fazer?")
    inter = str(input())
    match inter:
        case "ligar":
            ligarFerramenta()
        case "desligar":
            desligarFerramenta()
        case "home":
            home()
        case "mover":
            eixo = str(input("Qual eixo (X, Y ou Z)? "))
            distancia = float(input("Distância a percorrer: "))
            mover_eixo(eixo, distancia)
        case "atual":
            obter_posicao_atual()
        case "quit":
            quit()
        case _:
            quit()
head = None
if __name__ == "__main__":
    available_ports = list_ports.comports()
    try:
        port = available_ports[0].device
        device = pydobot.Dobot(port=port, verbose=True)
    except:
        port = available_ports[1].device
        device = pydobot.Dobot(port=port, verbose=True)
    print("Olá! esta é uma pequena interface gráfica para interagir com o robô")
    head = str(input("\nInicialmente, qual o atuador sendo utilizado?\n"))
    # available_ports = list_ports.comports()
    # print(f'available ports: {[x.device for x in available_ports]}')
    # port = available_ports[0].device
    # a = int(input("Quantos inputs vc quer? "))
    # b = []
    # for i in range(a):
    #     b.append(str(input(f'Frase {i + 1}:')))
    # print(b)
    menu()