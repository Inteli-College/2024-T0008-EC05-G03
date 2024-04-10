# Integração com o robô

&emsp;&emsp;Para que todas as diferentes partes da solução se comuniquem adequadamente entre si, é necessário que o robô de braço mecânico (Dobot Magician Lite) e o backend da aplicação web da solução estejam interligados. Com base nisso, durante a sprint 4, a equipe Violeta focou em integrar o script do robô com o backend da solução.

>As tecnologias usadas para o desenvolvimento do backend e para integração com o robô foram as mesmas usadas para o desenvolvimento de backend na [sprint 2](../../sprint-2/sistema-robotico/tecnologias.md) e [sprint 3](../../sprint-3/Backend/tecnologias.md). O tutorial para inicialização do backend está disponível [aqui](../inicializacao.md).

## Classe de integração: ```Robo```

&emsp;&emsp;Para integrar o robô com a API desenvolvida como parte do backend, foi necessário criar uma classe representante do robô chamada, a qual foi nomeada ```Robo``` e contém atributos e métodos ligados às suas ações de movimentação. Dentro da estrutura de pastas, o arquivo com essa classe está contido em ```./src/roboClass.py```.

### Atributos

&emsp;&emsp;A classe Robo possui uma série de atributos que são declarados no início de sua estrutura. Tais atributos podem ser observados na figura 1.

<p style={{textAlign: 'center'}}>Figura 1 - Atributos da classe Robo</p>

<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../static/img/sprint-4/backend/robo_atributos.png").default} style={{width: 400}} alt="Métodos da classe Robo" />
        <br/>
    </div>
</div>

<p style={{textAlign: 'center'}}>Fonte: Elaboração própria</p>

- Os atributos ```mR``` e ```mA``` referem-se às duas matrizes que devem constar no instanciamento de um objeto da classe e que contêm o id do compartimento, o nome e a quantidade de um determinado item em um determinado compartimento do layout de um carrinho.

> ```mR``` -> matriz de Rebastecimento (refere-se à gaveta/bandeja de origem dos itens do carrinho)

> ```mA``` -> matriz de Abastecimento (refere-se à gaveta/bandeja de destino dos itens do carrinho)

- O atributo ```device``` trata-se de uma instância da classe ```Dobot``` contida na biblioteca Pydobot. Essa classe representa a comunicação com o próprio robô e oferece suporte para todas as funções ligadas a movimentação do braço mecânico.

- O atributo ```serial``` representa a porta serial (USB) com a qual é feita a comunicação com o sensor infravermelho acoplado ao robô.

### Método mover

<p style={{textAlign: 'center'}}>Figura 2 - Método mover</p>

<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../static/img/sprint-4/backend/robo_metodo_1.png").default} style={{width: 400}} alt="Método mover da classe Robo" />
        <br/>
    </div>
</div>

<p style={{textAlign: 'center'}}>Fonte: Elaboração própria</p>

&emsp;&emsp;O método mover recebe os parâmetros ```x``` e ```y```, que representam as respectivas coordenadas necessárias para movimentação do braço mecânico num plano bidimensional. Quando o método é executado, a velocidade de movimentação do braço mecânico é ajustada, a movimentação para a posição determinada pelos parâmetros é feita e, durante 2 segundos, o dado booleano de se algum objeto foi detectado pelo sensor infravermelho é registrada na variável do tipo lista "leitura". Caso essa detecção ocorra, o método retorna ```True```.

### Método espiral e método cobrinha

&emsp;&emsp;Os métodos ```espiral``` e ```cobrinha``` são referentes às rotinas de verificação implementadas pela equipe Violeta. Mais informações sobre elas podem ser encontradas [nesta seção](../../sprint-3/hardware_integracao/rotina_verificacao.md).

### Método reabastecer

<p style={{textAlign: 'center'}}>Figura 3 - Método reabastecer</p>

<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../static/img/sprint-4/backend/robo_metodo_2.png").default} style={{width: 800}} alt="Método reabastecer da classe Robo" />
        <br/>
    </div>
</div>

<p style={{textAlign: 'center'}}>Fonte: Elaboração própria</p>

&emsp;&emsp;O método reabastecer é responsável por executar a ação de reabastecimento do robô de braço mecânico. Esse método recebe o parâmetro ```mode``` do tipo int, que indica ao programa se e qual(is) rotina(s) de verificação será(ão) executada(s) de acordo com um valor que varia de 0 a 3.  

&emsp;&emsp;Ao ser executado, o método reabastecer cria duas variáveis do tipo lista (```caminho``` e ```destino```) e verifica se existe uma posição de reabastecimento (```caminho```) adequada para cada posição de abastecimento (```destino```). Caso exista, sua execução prossegue com o início da movimentação do braço mecânico para reabastecimento enquanto houver posições definidas na variável ```caminho```.

&emsp;&emsp;A partir disso, ao se dirigir à gaveta/bandeja de origem dos itens a serem usados para reabastecer um carrinho, de acordo com o valor do atributo ```mode```, ocorrem as rotinas de verificação, como indica a tabela a seguir.

<p style={{textAlign: 'center'}}>Tabela 1 - Relação entre parâmetro mode e rotinas de verificação</p>

| **Valor de mode** | **Rotina de verificação executada** |
|-------------------|-------------------------------------|
| 0                 | Nenhuma                             |
| 1                 | Espiral                             |
| 2                 | Cobrinha                            |
| 3                 | Espiral e cobrinha                  |

<p style={{textAlign: 'center'}}>Fonte: Elaboração própria</p>

&emsp;&emsp;Com as rotinas de verificação, o robô é capaz de detectar quando um objeto é pego e, então, levá-lo para sua posição de destino no respectivo compartimento do layout de destino previamente definido na aplicação web. Após essa transposição, as respectivas posições de caminho e destino armazenadas nas variáveis homônimas passam a ser desconsideradas pelo programa, de modo que o loop definido na linha 14 não se torne infinito.

### Método inicial

<p style={{textAlign: 'center'}}>Figura 4 - Método inicial</p>

<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../static/img/sprint-4/backend/robo_metodo_3.png").default} style={{width: 400}} alt="Método inicial da classe Robo" />
        <br/>
    </div>
</div>

<p style={{textAlign: 'center'}}>Fonte: Elaboração própria</p>

&emsp;&emsp;O método inicial faz com que o braço mecânico se mova à sua posição inicial.

### Método posicao

<p style={{textAlign: 'center'}}>Figura 5 - Método posicao</p>

<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../static/img/sprint-4/backend/robo_metodo_4.png").default} style={{width: 400}} alt="Método posicao da classe Robo" />
        <br/>
    </div>
</div>

<p style={{textAlign: 'center'}}>Fonte: Elaboração própria</p>

&emsp;&emsp;O método posicao retorna a posição atual do braço mecânico.

### Método fechar

<p style={{textAlign: 'center'}}>Figura 6 - Método fechar</p>

<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../static/img/sprint-4/backend/robo_metodo_5.png").default} style={{width: 400}} alt="Método fechar da classe Robo" />
        <br/>
    </div>
</div>

<p style={{textAlign: 'center'}}>Fonte: Elaboração própria</p>

&emsp;&emsp;O método fechar faz com que a conexão com o robô de braço mecânico seja terminada.

### Método ferramenta

<p style={{textAlign: 'center'}}>Figura 7 - Método ferramenta</p>

<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../static/img/sprint-4/backend/robo_metodo_6.png").default} style={{width: 400}} alt="Método ferramenta da classe Robo" />
        <br/>
    </div>
</div>

<p style={{textAlign: 'center'}}>Fonte: Elaboração própria</p>

&emsp;&emsp;O método ferramenta faz com que a ferramenta (ventosa) fixada na extremidade do braço mecânico seja ativada ou desativada, de acordo com seu parâmetro booleano ```state```, que deve constar quando tal método é executado.

## Integração com aplicação web (API)

&emsp;&emsp;Para permitir a comunicação efetiva entre o backend da aplicação web da solução e o robô Dobot Magician Lite, a equipe Violeta definiu uma série de rotas para API que executam métodos da classe ```Robo``` listados acima. A tabela 2, a seguir, contém a relação entre cada rota em questão e os métodos da classe Robo executados em tal rota, bem como uma breve descrição da relação em cada linha.

<p style={{textAlign: 'center'}}>Tabela 2 - Relação entre rotas da aplicação web e métodos da classe Robo</p>

| **Rota da API**           | **Método da classe Robo** | **Descrição**                                                                                                                                                                                           |
|--------------------|---------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| /robo_position     | posicao                   | Retorna a posição atual do braço mecânico em cada eixo (x, y, z & r).                                                                                                                                   |
| /home              | inicial                   | Move o braço mecânico para sua posição inicial.                                                                                                                                                         |
| /actuator          | ferramenta                | Ativa ou desativa a ventosa fixa à extremidade do braço mecânico.                                                                                                                                       |
| "/refill/```mode``` | reabastecer               | Executa o processo de reabastecimento de um carrinho; define se haverá e quais rotinas de verificação nesse processo de acordo com o valor inteiro entre 0 e 3 inserido na rota no lugar de ```mode```. |

<p style={{textAlign: 'center'}}>Fonte: Elaboração própria</p>
