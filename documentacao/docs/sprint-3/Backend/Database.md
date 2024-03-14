## Base de dados

&emsp;&emsp; Como parte do desenvolvimento da aplicação web, foi feita uma base de dados  para armazenar e gerenciar as informações essenciais para o funcionamento do projeto. Esta base de dados foi projetada para abrigar não apenas os dados relacionados aos layouts utilizados no sistema, mas também para registrar e gerenciar os dados de login dos usuários.

### 1. Tabelas:
Abaixo seguem todas as tabelas e suas respectivas colunas.

#### Tabela "Layout":
- **Descrição:** Armazena nome do respectivo layout, junto de seu id
  
| Coluna          | Tipo       | Descrição                                      |
|-----------------|------------|------------------------------------------------|
| id              | INTEGER    | Chave primária única do layout                 |
| nome_layout     | TEXT       | Nome do layout                                 |

#### Tabela "Compartment":
- **Descrição:** Guarda o nome dos medicamentos, seu id, posição e quantidade em cada compartimento de um layout; 
  
| Coluna             | Tipo       | Descrição                                           |
|--------------------|------------|-----------------------------------------------------|
| id                 | INTEGER    | Chave primária única do esquema                     |
| nome_item          | TEXT       | Nome do item no compartimento                       |
| quantidade_item    | INTEGER    | Quantidade de itens no compartimento                |
| numero_compartimento| INTEGER   | Número do compartimento do layout no qual o item deve ser colocado|
| id_layout          | INTEGER    | Chave estrangeira referenciando o id da tabela "Layout"|
| id_item            | INTEGER    | Chave do remédio a ser adicionado |

#### Tabela "Users":
- **Descrição:** Armazena informações sobre os usuários do sistema.
  
| Coluna             | Tipo       | Descrição                                           |
|--------------------|------------|-----------------------------------------------------|
| id                 | INTEGER    | Chave primária única do usuário                     |
| usuario            | TEXT       | Nome do usuário                                     |
| senha              | TEXT       | Senha do usuário                                    |
| nivel_prioridade   | INTEGER    | Nível de prioridade do usuário para controle de acesso |

### 2. Restrições:

- A tabela "Compartment" possui uma chave estrangeira "id_layout" que referencia a tabela "Layout".

### 3. Desenho esquemático da base de dados:

&emsp;&emsp; Segue abaixo um desenho esquemático da base de dados desenvolvida, afim de melhorar a leitura a respeito da mesma.

![Diagrama da base de dados](../../../static/img/sprint-3/backend/base_dados/diagrama_base.png)

&emsp;&emsp; No documento fornecido, apresentam-se detalhadamente as três tabelas que compõem a base de dados. Cada tabela é acompanhada dos seus atributos, conforme previamente descrito. Essa análise minuciosa oferece uma visão abrangente da estrutura do banco de dados, facilitando a compreensão e manipulação dos dados armazenados. Essa documentação é fundamental para garantir a integridade do sistema.


