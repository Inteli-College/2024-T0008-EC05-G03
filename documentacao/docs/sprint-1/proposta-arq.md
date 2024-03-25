---
sidebar_position: 4
custom_edit_url: null
---


# Proposta de arquitetura

## Requisitos da solução

### Requisitos funcionais

&emsp;&emsp;Requisitos funcionais são descrições detalhadas das funções ou capacidades que o sistema deve fornecer para atender às necessidades do usuário. Eles descrevem as operações específicas que o sistema deve ser capaz de realizar, as interações que ele deve suportar e os resultados que ele deve produzir, definindo assim o comportamento funcional do sistema. Geralmente, esses requisitos são expressos em termos de entradas, saídas e comportamentos esperados.

&emsp;&emsp;Nesse contexto, foram delineados os requisitos funcionais específicos para o nosso sistema, os quais estão apresentados de forma detalhada na tabela a seguir:

<p style={{textAlign: 'center'}}>Tabela 1 - Requisitos funcionais da solução</p>

| Requisitos | Ação |
| --- | --- |
| RF01 | O sistema deve ser capaz de permitir a escolha de diferentes opções de layouts para o carrinho de emergência. |
| RF02 | O sistema deve ser capaz de montar os layouts de maneira automatizada. |
| RF03 | O sistema deve ser preciso ao efetuar a tarefa, sem apresentar erros de posicionamento. |
| RF04 | O sistema deve ser capaz de rastrear os itens manuseados, informando sua localização quando solicitado. |
| RF05 | O sistema deve apresentar alto nível de segurança, não apresentando falhas e apresentando alta precisão ao realizar as atividades. |
| RF06 | Deve haver uma documentação abrangente do sistema, incluindo manuais de usuário, manuais de manutenção e documentação técnica para facilitar a operação, manutenção e suporte técnico. |
| RF07 | O sistema deve permitir a integração com outros sistemas. |

<p style={{textAlign: 'center'}}>Fonte: Elaboração própria</p>

&emsp;&emsp;Em síntese, os requisitos funcionais delineados para o sistema de carrinho de emergência representam um conjunto abrangente de diretrizes que visam garantir sua eficácia, segurança e usabilidade. Ao permitir a escolha de diferentes layouts, montagem automatizada, precisão na execução das tarefas, rastreamento de itens, alta segurança, documentação detalhada e integração com outros sistemas, o sistema está preparado para atender às demandas e necessidades dos usuários de forma eficiente. A incorporação desses requisitos funcionais não apenas define o comportamento esperado do sistema, mas também estabelece as bases para uma implementação bem-sucedida que promove a confiabilidade e a excelência operacional.

### Requisitos não funcionais

&emsp;&emsp;Os requisitos não funcionais de um sistema descrevem atributos que não estão diretamente relacionados às funcionalidades específicas do sistema, mas são igualmente importantes para sua operação, desempenho, segurança e usabilidade. Assim, visando uma maior qualidade de operação do sistema, estabelecemos os seguintes requisitos não funcionais:

<p style={{textAlign: 'center'}}>Tabela 2 - Requisitos não funcionais da solução</p>

| Requisitos | Descrição |
| --- | --- |
| RNF01 | O sistema permitir a adição de novos layouts de maneira configurável e fácil, fazendo com que o próprio usuário o mantenha atualizado. |
| RNF02 | Aplicação com UI agradável e de fácil compreensão. |
| RNF03| Monitorar continuamente o status operacional do robô e de todos os componentes envolvidos na montagem, detectando e respondendo imediatamente a quaisquer anomalias ou problemas que possam surgir. |
| RNF04 | O sistema pode ser equipado com algoritmos de correção de erros robustos, capazes de identificar e corrigir automaticamente problemas durante o processo de montagem, minimizando a ocorrência de falhas graves. |
| RNF05 | O sistema deve registrar todas as falhas, anomalias e eventos relevantes durante o processo de montagem para análise posterior, permitindo a identificação de tendências e a implementação de medidas preventivas. |
| RNF06 | O software e o robô devem ter uma baixa latência, que permita uma maior eficácia. |
| RNF07 | O sistema deve ser altamente disponível, minimizando o tempo de inatividade não planejado e garantindo que o sistema esteja sempre disponível para uso durante o horário de produção. |

<p style={{textAlign: 'center'}}>Fonte: Elaboração própria</p>

&emsp;&emsp;Em conclusão, os requisitos não funcionais delineados para o sistema são essenciais para garantir sua eficiência, confiabilidade e usabilidade. Desde a facilidade de atualização dos layouts até a detecção e correção automática de falhas, cada requisito foi cuidadosamente elaborado para promover uma operação fluida e segura. Além disso, a baixa latência e alta disponibilidade são elementos-chave para assegurar que o sistema esteja sempre pronto para uso, minimizando o tempo de inatividade não planejado. Ao adotar uma abordagem abrangente em relação aos requisitos não funcionais, podemos garantir que o sistema não apenas atenda às expectativas de desempenho, mas também ofereça uma experiência de usuário aprimorada e confiável.

## Diagrama de blocos

<p style={{textAlign: 'center'}}>Figura 1 - Diagrama de blocos da solução</p>

<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../static/img/sprint-1/diagrama_blocos.png").default} style={{width: 300}} alt="Diagrama de blocos" />
        <br />
    </div>
</div>

<p style={{textAlign: 'center'}}>Fonte: Elaboração própria</p>

## Descrição dos elementos do diagrama de blocos

O diagrama representa de forma geral todas as tecnologias envonvidas na solução do projeto e como eles se comunicam para definirem a nossa solução. Para isso, temos dois blocos maiores: o computador e o sistema de automação:

- Computador: responsável por toda a parte gráfica do projeto com a qual o usuário interage e pela maior parte do processamento que recebe as informações de entrada do usuário. Retorna instruções processadas para o sistema de automação, fisicamente conectados por um cabo USB-A e USB-C.

  - Canva interativo: a interface gráfica de prototipação da solução, permitindo que o usuário configure as posições dos itens a serem reabastecidos ao mostrar em escala a gaveta de reabastecimento e a gaveta do carrinho emergencial a ser reabastecida. Será por ele que o usuário poderá selecionar, fazer testes para verificar caso a posição dos elementos adicionados condiz com a posição real do elemento e permitirá que o programa seja executado. Planejamos criá-lo utilizando HTML, CSS, React e ReactFlow, fazendo requisições web com o backend para processar e armazenar as informações e com o script do robô para executá-lo.
  
  - Backend: a parte da solução que rebece os dados enviados pelo usuário, os processa e armazena conforme o necessário para os retornar para o sistema de automação e ao canva interativo, utilizando Node.js, JavaScript ou TypeScript para executá-lo, e requisições SQL para enviar os dados para o banco de dados. Ele é dividido entre o Script de Backend e o banco de dados.
  
    - Script de Backend: a parte mais vital do projeto, processando todos os dados de entrada, modificando e adaptando-os conforme o necessário; escrevendo e alterando-os no banco de dados; e retornando os resultados para o cliente pelo canva interativo. Ele será desenvolvido principalmente com TypeScript ou JavaScript e se comunicará com o canva por meio de requisições assíncronas, com o banco de dados fazendo requisições SQL, e executando o script do robô chamando-o em sua pipeline.
  
    - Banco de dados: armazena tudo sobre a nossa aplicação, sejam históricos de posições já feitas, layouts de reabastecimento criados previamente e perfis de utilização. Planejamos criá-lo utilizando MySQL e comunicá-lo com o script de backend por meio de requisições SQL.

  - Script do robô: ditará as ações feitas pelo Magician Lite, fornecendo-o a quantidade de pontos a serem visitados, a quantidade de vezes que determinado ponto deve ser visitado e regindo o estado do robô (ventosa ativa ou não, robô ativo ou não, etc). Para isso, utilizaremos Python e em específico, uma biblioteca chamada DobotEDU ou, como alternativa, a biblioteca pydobot. Ele se comunicará com o canva por meio de um micro-serviço ou script intermediário, com o backend por meio de requisições, e com o robô pela própria biblioteca.

- Sistema de automação: o sistema de automação é a parte física completa da solução proposta, sendo capaz de realizar movimentos precisos e rápidos.

  - Magician Lite: ele é o robô que utilizaremos como parte da solução do projeto. Ele consiste em uma garra mecânica que possui diferentes tipos de cabeças para diferentes usos e possui um software de utilização beginner-friendly. Sua rápida capacidade de movimento, precisão e diferentes possibilidades de utilização foram pontos vitais para a escolha neste projeto.

    - Microprocessador: o microprocessador é o cérebro do robô, ele quem traduz todo o código feito pelo script do robô pra ações que possam ser entendidas pelo Magician Lite e definindo tipos de movimento que podem serem feitos, como o Jump, o Move Joint, o Move Linear e o Arc.

    - Juntas: responsáveis pelo movimento do robô, possuindo 3 graus de liberdade para aproveitar todo o potencial do robô.

    - Ventosa: responsável pela maior parte da interação com o objeto a ser transportado. Uma bomba de vácuo dentro do robô gera uma diferença de pressão entre a ventosa e o ambiente, tornando-a capaz de segurar e transportar diversos objetos.

  - Baterias externas: planejamos que o projeto tenha um grande tempo de duração e não dependa de cabos de energia para funcionar pois isso pode atrapalhar a velocidade de resposta para um paciente e tornar-se um empecilho para utilizar em locais diferentes. Com isso em mente, propomos duas baterias de 12V acopladas ao robô para aumentar seu tempo de uso.
