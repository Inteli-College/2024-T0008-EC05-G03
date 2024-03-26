from roboClass import Robo

m1 = [[1,"sla",3],
        [3,"cu",2],
          ]
m2 = [[4,"cu",1],
        [3,"sla",3]]

a = Robo(m1,m2)

a.inicial()

a.fechar()

b = Robo(m1,m2)

x,y,z,r,_,_,_,_ = b.posicao()

print(x,y,z,r)

