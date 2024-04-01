---
sidebar_position: 4
custom_edit_url: null
---

# Documentação da API em Flask

## API em Flask

&emsp;&emsp;Esta API foi projetada com o objetivo de proporcionar uma gestão eficiente e sistemática de layouts e compartimentos, abrindo um leque de possibilidades para aplicações que requerem organização detalhada e acesso rápido a informações específicas. Com endpoints claros e objetivos, a API se apresenta como uma solução robusta para as necessidades de controle e administração de dados relacionados a layouts e seus componentes. Além de detalhar como deve-se executar o servidor Flask.

## Endpoints

### Pegar todos os remédios e quantidades

```http
/get_all_compartments_medication
```

- **Método**: GET
- **Descrição**: Retorna o nome e a quantidade de todos os itens nos compartimentos.

### Adicionar novo remédio ao respectivo layout

```http
/add_compartment/<int:id_layout>
```

- **Método**: POST
- **Descrição**: Adiciona um novo compartimento vinculado a um layout pelo seu ID.

### Pegar todos os compartimentos de um respectivo layout

```http
/get_compartments/<int:id_layout>
```

- **Método**: GET
- **Descrição**: Obtém todos os compartimentos de acordo com o ID do layout fornecido.

### Baixar dados de algum layout

```http
/download_compartment/<int:id_layout>
```

- **Método**: GET
- **Descrição**: Baixa um arquivo CSV contendo os detalhes dos compartimentos para um dado ID de layout.

### Importar um layout

```http
 /upload_compartment
```

- **Método**: POST
- **Descrição**: Lê um arquivo CSV e adiciona as informações na base de dados, criando novos compartimentos e um layout associado.

### Modificar um compartimento de algum layout

```http
 /modify_compartment/<int:id>
```

- **Método**: PUT
- **Descrição**: Modifica um compartimento existente de acordo com o ID do compartimento fornecido na URL.

### Deletar um compartimento de algum layout

```http
 /delete_compartment/<int:id>
```

- **Método**: DELETE
- **Descrição**: Deleta um compartimento específico baseado no ID fornecido.

### Deletar um layout e todos seus compartimentos

```http
 /delete_layout/<int:id>
```

- **Método**: DELETE
- **Descrição**: Deleta um layout e todos os compartimentos associados a ele, baseado no ID do layout fornecido.

### Criar novo layout

```http
 /add_layout
```

- **Método**: POST
- **Descrição**: Adiciona um novo layout.

### Pegar todos os layouts

```http
 /get_layouts
```

- **Método**: GET
- **Descrição**: Retorna todos os layouts existentes.

&emsp;&emsp;Esta API foi projetada com o objetivo de proporcionar uma gestão eficiente e sistemática de layouts e compartimentos, abrindo um leque de possibilidades para aplicações que requerem organização detalhada e acesso rápido a informações específicas. Com endpoints claros e objetivos, a API se apresenta como uma solução robusta para as necessidades de controle e administração de dados relacionados a layouts e seus componentes.

## Como executar

&emsp;&emsp;Para executar a API, siga os passos na seção de [inicialização do sistema](inicializacao.md) da documentação.
