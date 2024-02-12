---
sidebar_position: 4
custom_edit_url: null
---

# Proposta de arquitetura

## Requisitos da solução

### Requisitos funcionais
&emsp;&emsp;Requisitos funcionais são descrições detalhadas das funções ou capacidades que o sistema deve fornecer para atender às necessidades do usuário. Eles descrevem as operações específicas que o sistema deve ser capaz de realizar, as interações que ele deve suportar e os resultados que ele deve produzir, definindo assim o comportamento funcional do sistema. Geralmente, esses requisitos são expressos em termos de entradas, saídas e comportamentos esperados.

&emsp;&emsp;Nesse contexto, foram delineados os requisitos funcionais específicos para o nosso sistema, os quais estão apresentados de forma detalhada na tabela a seguir:

| Requisitos | Ação |
| --- | --- |
| RF01 | O sistema deve ser capaz de permitir a escolha de diferentes maneiras de montar a caixa, ou seja, opções de layouts. |
| RF02 | O sistema deve ser capaz de montar as caixas de maneira automatizada. |
| RF03 | O sistema deve ser preciso ao efetuar a tarefa, sem apresentar erros de posicionamento. |
| RF04 | O sistema deve ser capaz de armazenar as informações dos itens manuseados. |
| RF05 | O sistema deve ser capaz de rastrear os itens manuseados, informando sua localização quando solicitado. |
| RF06 | O sistema deve apresentar alto nível de segurança, não apresentando falhas e apresentando alta precisão ao realizar as atividades. |
| RF07 | O sistema deve validar rigorosamente os dados de entrada, como as especificações do layout do carrinho de emergência, para garantir que sejam precisos e completos antes de iniciar o processo de montagem. |
| RF08 | Deve haver uma documentação abrangente do sistema, incluindo manuais de usuário, manuais de manutenção e documentação técnica para facilitar a operação, manutenção e suporte técnico. |
| RF09 | O sistema deve permitir a integração com outros sistemas. |

### Requisitos não funcionais

&emsp;&emsp;Os requisitos não funcionais de um sistema descrevem atributos que não estão diretamente relacionados às funcionalidades específicas do sistema, mas são igualmente importantes para sua operação, desempenho, segurança e usabilidade. Assim, visando uma maior qualidade de operação do sistema, estabelecemos os seguintes requisitos não funcionais: 

| Requisitos | Descrição | Teste |
| --- | --- | --- |
| RNF01 | O sistema permitir a adição de novos layouts de maneira configurável e fácil, fazendo com que o próprio usuário o mantenha atualizado. | Teste |
| RNF02 | Aplicação com UI agradável e de fácil compreensão. | Teste |
| RNF03 | O sistema deve ser eficiente ao realizar a montagem das caixas, sendo rápido e preciso. | Teste |
| RNF04 | O sistema deve permitir que o usuário selecione o layout do carrinho desejado. | Teste |
| RNF05 | Monitorar continuamente o status operacional do robô e de todos os componentes envolvidos na montagem, detectando e respondendo imediatamente a quaisquer anomalias ou problemas que possam surgir. | Teste |
| RNF06 | O sistema pode ser equipado com algoritmos de correção de erros robustos, capazes de identificar e corrigir automaticamente problemas durante o processo de montagem, minimizando a ocorrência de falhas graves. | Teste |
| RNF07 | O sistema deve registrar todas as falhas, anomalias e eventos relevantes durante o processo de montagem para análise posterior, permitindo a identificação de tendências e a implementação de medidas preventivas. | Teste |
| RNF08 | O software e o robô devem ter uma baixa latência, que permita uma maior eficácia. | Teste |
| RNF09 | O sistema deve ser altamente disponível, minimizando o tempo de inatividade não planejado e garantindo que o sistema esteja sempre disponível para uso durante o horário de produção | Teste |

## Diagrama de blocos
<div style={{margin:25}}>
    <div style={{textAlign: 'center'}}>
        <img src="/img/diagrama_blocos.png" style={{width: 300}}/>
        <br/>
    </div>
</div>
Adicionar a descrição dos componentes aqui

##