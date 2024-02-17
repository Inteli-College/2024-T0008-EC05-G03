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
| RF01 | O sistema deve ser capaz de permitir a escolha de diferentes opções de layouts para o carrinho de emergência. |
| RF02 | O sistema deve ser capaz de montar os layouts de maneira automatizada. |
| RF03 | O sistema deve ser preciso ao efetuar a tarefa, sem apresentar erros de posicionamento. |
| RF04 | O sistema deve ser capaz de rastrear os itens manuseados, informando sua localização quando solicitado. |
| RF05 | O sistema deve apresentar alto nível de segurança, não apresentando falhas e apresentando alta precisão ao realizar as atividades. |
| RF06 | Deve haver uma documentação abrangente do sistema, incluindo manuais de usuário, manuais de manutenção e documentação técnica para facilitar a operação, manutenção e suporte técnico. |
| RF07 | O sistema deve permitir a integração com outros sistemas. |

&emsp;&emsp;Em síntese, os requisitos funcionais delineados para o sistema de carrinho de emergência representam um conjunto abrangente de diretrizes que visam garantir sua eficácia, segurança e usabilidade. Ao permitir a escolha de diferentes layouts, montagem automatizada, precisão na execução das tarefas, rastreamento de itens, alta segurança, documentação detalhada e integração com outros sistemas, o sistema está preparado para atender às demandas e necessidades dos usuários de forma eficiente. A incorporação desses requisitos funcionais não apenas define o comportamento esperado do sistema, mas também estabelece as bases para uma implementação bem-sucedida que promove a confiabilidade e a excelência operacional.

### Requisitos não funcionais

&emsp;&emsp;Os requisitos não funcionais de um sistema descrevem atributos que não estão diretamente relacionados às funcionalidades específicas do sistema, mas são igualmente importantes para sua operação, desempenho, segurança e usabilidade. Assim, visando uma maior qualidade de operação do sistema, estabelecemos os seguintes requisitos não funcionais: 

| Requisitos | Descrição |
| --- | --- |
| RNF01 | O sistema permitir a adição de novos layouts de maneira configurável e fácil, fazendo com que o próprio usuário o mantenha atualizado. |
| RNF02 | Aplicação com UI agradável e de fácil compreensão. |
| RNF03| Monitorar continuamente o status operacional do robô e de todos os componentes envolvidos na montagem, detectando e respondendo imediatamente a quaisquer anomalias ou problemas que possam surgir. |
| RNF04 | O sistema pode ser equipado com algoritmos de correção de erros robustos, capazes de identificar e corrigir automaticamente problemas durante o processo de montagem, minimizando a ocorrência de falhas graves. |
| RNF05 | O sistema deve registrar todas as falhas, anomalias e eventos relevantes durante o processo de montagem para análise posterior, permitindo a identificação de tendências e a implementação de medidas preventivas. |
| RNF06 | O software e o robô devem ter uma baixa latência, que permita uma maior eficácia. |
| RNF07 | O sistema deve ser altamente disponível, minimizando o tempo de inatividade não planejado e garantindo que o sistema esteja sempre disponível para uso durante o horário de produção. |

&emsp;&emsp;Em suma, os requisitos não funcionais delineados para o sistema são essenciais para garantir sua eficiência, confiabilidade e usabilidade. Desde a facilidade de atualização dos layouts até a detecção e correção automática de falhas, cada requisito foi cuidadosamente elaborado para promover uma operação fluida e segura. Além disso, a baixa latência e alta disponibilidade são elementos-chave para assegurar que o sistema esteja sempre pronto para uso, minimizando o tempo de inatividade não planejado. Ao adotar uma abordagem abrangente em relação aos requisitos não funcionais, podemos garantir que o sistema não apenas atenda às expectativas de desempenho, mas também ofereça uma experiência de usuário aprimorada e confiável.

## Diagrama de blocos
<div style={{margin:25}}>
    <div style={{textAlign: 'center'}}>
        <img src="/img/diagrama_blocos.png" style={{width: 300}}/>
        <br/>
    </div>
</div>
Adicionar a descrição dos componentes aqui

##