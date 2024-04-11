
import pydobot
import json
import numpy as np
import time
import serial

# Classe para mexer o robô (o instanciamento precisa de duas matrizes do formato [[id, nome, qtd],...])

class Robo: 
    def __init__(self, reab, gav):
        if len(reab) == len(gav) and len(reab[0]) == len(gav[0]):
            data = None
            file_path ="./pontos.json"
            with open(file_path, 'r') as file:
                if file_path.endswith('.json'):
                    data = json.load(file)
                    self.home, self.remedios, self.destinos = data["home"], {ponto['nome']: ponto['posicao'] for ponto in data["remedios"]}, {ponto['nome']: ponto['posicao'] for ponto in data["destinos"]}
                else:
                    raise ValueError("Formato de arquivo não suportado")
            try:
                self.mR = reab
                self.mA = gav
                self.device = pydobot.Dobot(port="COM12", verbose=False)
                self.serial = serial.Serial('COM15', 9600, timeout=1)
                #self.device.move_to_J(self.home['x'], self.home['y'], self.home['z'], self.home['r'], wait=True)
            except:
                raise Exception("Port já está sendo utilizado")
        else:
            raise Exception("Gavetas de tamanhos diferentes")
    
    # Função para mover para a posição designada e verificar se pegou algo
    def mover(self,x,y):
        self.device.speed(300,100)
        leitura = []
        self.device.move_to_J(round(x,2), round(y,2), 55.64,0, wait=True)
        self.device.move_to(round(x,2), round(y,2), -25.39,0, wait=True)
        self.device.move_to(round(x,2), round(y,2), 55.64,-144, wait=True)
        self.device.move_to(round(x,2), round(y,2), 55.64,144, wait=False)
        start = time.time()
        while time.time() - start < 2:
            leitura.append(self.serial.readline().decode('utf-8').strip())
        self.device.speed(100,100)
        return "True" in leitura  # Se pegou ou não
    
    # Primeiro tipo de verificação em espiral
    def espiral(self, pc, cx, cy, p):
        div = 2*p + 1
        matRot = np.array([[0.0, 1.0], [-1.0, 0.0]])
        pegou = False
        fim = False
        delta = 1
        iter = 0
        direcao = np.array([1.0, 0.0])
        matDelta = np.array([[round(float(2*cx/div),2), 0.0], [0.0, round(float(2*cy/div),2)]])
        while not pegou and not fim:
            for a in range(delta):
                pc += matDelta @ direcao
                pegou = self.mover(pc[0], pc[1])
            iter += 1
            if iter == 2:
                delta += 1
                iter = 0
            direcao = matRot @ direcao
            if delta >= div:
                for a in range(delta-1):
                    pc += matDelta @ direcao
                    pegou = self.mover(pc[0], pc[1])
                fim = True
                break
        return pegou
    
    # Segundo tipo de verificação em cobrinha
    def cobrinha (self, pc, cx, cy, qx, qy):
        dx, dy = round(2*cx/(qx-1),2), round(2*cy/qy,2)
        xVal = -1
        achou = False
        for y in range(qy):
            for x in range(qx-1):
                pc[0] += dx*xVal
                achou = self.mover(pc[0], pc[1])
                if achou:
                    break
            if achou:
                break
            pc[1] -= dy
            if y != qy-1:
                achou = self.mover(pc[0], pc[1])
            if achou:
                break
            xVal *= -1
        return achou
    
    # Função que arruma com base nos dados do objeto (o modo pode ser: 0 - nenhuma verificação, 1 - espiral, 2 - cobrinha, 3 - as duas)
    def reabastecer(self, mode: int):
        caminho = []
        destino = []
        for med in self.mR:
            caminho.append(med)
            for gav in self.mA:
                if med[1] == gav[1]:
                    destino.append(gav)
                    break
                elif gav == self.mA[-1] and med[1] != gav[1]:
                    raise Exception(f"Remédio {gav[1]} não encontrado na gaveta de reabastecimento")
        
        self.device.move_to_J(self.home['x'], self.home['y'], self.home['z'], self.home['r'], wait=True)
        while len(caminho) != 0:
            for i in range(destino[0][2]):
                remedio = self.remedios["remedio"+str(caminho[0][0])]
                self.device.move_to_J(remedio['x'], remedio['y'], 55.64, remedio['r'], wait=True)
                self.device.move_to(remedio['x'], remedio['y'], remedio['z'], remedio['r'], wait=True)
                self.device.suck(True)
                self.device.wait(200)
                self.device.move_to(remedio['x'], remedio['y'], 55.64, -144, wait=True)
                if mode == 0:
                    pass
                elif mode == 1:
                    pegou = []
                    self.device.move_to(remedio['x'], remedio['y'], 55.64, 144, wait=False)
                    start = time.time()
                    while time.time() - start < 2:
                        pegou.append(self.serial.readline().decode('utf-8').strip())
                    if "True" not in pegou:
                        primVer = self.espiral(np.array([remedio["x"],remedio["y"]]),20,40,1)
                        if not primVer:
                            self.device.suck(False)
                            raise Exception("Não achou nada")
                elif mode == 2:
                    pegou = []
                    self.device.move_to(remedio['x'], remedio['y'], 55.64, 144, wait=False)
                    start = time.time()
                    while time.time() - start < 2:
                        pegou.append(self.serial.readline().decode('utf-8').strip())
                    if "True" not in pegou:
                        primVer = self.cobrinha(np.array([remedio["x"] + 18,remedio["y"]+ 40]),18,40,3,3)
                        if not primVer:
                            self.device.suck(False)
                            raise Exception("Não achou nada")
                elif mode == 3:
                    pegou = []
                    self.device.move_to(remedio['x'], remedio['y'], 55.64, 144, wait=False)
                    start = time.time()
                    while time.time() - start < 2:
                        pegou.append(self.serial.readline().decode('utf-8').strip())
                    if "True" not in pegou:
                        primVer = self.espiral(np.array([remedio["x"],remedio["y"]]),20,40,1)
                        if not primVer:
                            xi, yi, _,_,_,_,_,_ = self.device.pose()
                            segVer = self.cobrinha([xi,yi],18,40,3,3)
                            if not segVer:
                                self.device.suck(False)
                                raise Exception("Não achou nada")
                else:
                    self.device.suck(False)
                    raise Exception("Modo inválido")
                self.device.move_to_J(self.home['x'], self.home['y'], self.home['z'], self.home['r'], wait=True)
                #Colocar
                destino_coords = self.destinos["destino"+str(destino[0][0])]
                self.device.move_to_J(destino_coords['x'], destino_coords['y'], destino_coords['z'], destino_coords['r'], wait=True)
                self.device.suck(False)
                self.device.move_to_J(self.home['x'], self.home['y'], self.home['z'], self.home['r'], wait=True)
            caminho.pop(0)
            destino.pop(0)
        

    #Função para voltar a posição inicial
    def inicial(self):
        self.device.move_to_J(self.home['x'], self.home['y'], self.home['z'], self.home['r'], wait=True)
    
    #Função para pegar a posição atual
    def posicao(self):
        return self.device.pose()

    #Função para fechar o programa
    def fechar(self):
        self.device.close()
        self.serial.close()


    def ferramenta(self, state: bool):
        self.device.suck(state)

#Teste quando exercutar o código diretamente

if __name__ == "__main__":
    m1 = [[1,"test1",3],
          [3,"test2",2]]
    
    m2 = [[4,"test2",1],
          [3,"test1",3]]
    
    a = Robo(m1,m2)
    a.reabastecer(1)
    a.fechar()

    b = Robo(m1,m2)
    b.reabastecer(2)