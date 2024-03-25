---
sidebar_position: 1
custom_edit_url: null
---

# Inicialização do sistema

## Pré-requisitos

- Python instalado
- PIP instaldo
- Git instalado
- Chave SSH configurada na sua conta do GitHub
- Robô Dobot Magician conectado ao computador via USB

## Passo a passo

Para inicializar o sistema da solução desenvolvido até a sprint 3, deve-se seguir os seguintes passos:

1 - Clone o repositório; para isso, abra um terminal no diretório desejado e digite o seguinte comando:

```git clone git@github.com:Inteli-College/2024-T0008-EC05-G03.git```

2 - Para instalar as bibliotecas utilizadas na solução, digite o seguinte comando:

```pip install -r 2024-T0008-EC05-G03/requirements.txt```

3 - Na mesma janela de terminal, digite o seguinte comando:

```cd 2024-T0008-EC05-G03/src```

4 - Para iniciar a CLI do sistema, digite o seguinte comando:

```py main.py```

> Para maiores informações sobre a CLI, veja a [seção de sistema robótico](https://inteli-college.github.io/2024-T0008-EC05-G03/category/sistema-robótico) na documentação da sprint 2 do projeto.

5 - Para iniciar o backend do sistema, digite o seguinte comando:

```py backend/routes.py```

> Para utilizar o backend puro (sem frontend), deve-se instalar um software próprio para testagem de API, como o [Postman](https://www.postman.com/), ou uma extensão do VS Code dedicada para tal, como o [Thunder Client](https://www.thunderclient.com/).

