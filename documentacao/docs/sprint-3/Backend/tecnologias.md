---
sidebar_position: 2
custom_edit_url: null
---

# Tecnologias utilizadas

## 1. Flask

&emsp;&emsp;Flask é um microframework para desenvolvimento de aplicações web em Python. Ele é caracterizado como microframework por disponibilizar apenas as funcionalidades essenciais para a construção de uma aplicação web, como a definição de endpoints, por exemplo. Contudo, suas funcionalidades são altamente escaláveis, uma vez que permitem a fácil integração com outras bibliotecas e frameworks para incorporar características mais refinidas de uma aplicação web.

&emsp;&emsp;No contexto do projeto desenvolvido pelo grupo Violeta, até a sprint 3, o Flask foi utilizado para a estruturação do backend da aplicação web que compõe a solução.

## 2. SQLAlchemy

&emsp;&emsp;O SQLAlchemy é uma biblioteca em Python voltada para a utilização de SQL (Structured Query Language), que é uma linguagem para manipulação de dados em bancos de dados relacionais. No contexto do projeto, o SQLAlchemy foi usado em combinação com o Flask. Desse modo, as rotas definidas no backend da aplicação web usam funções do SQLAlchemy para, dentro da base de dados, criar, visualizar, editar ou deletar os layouts dos carrinhos de emergência e os dados de login dos usuários da solução.

---

&nbsp;&nbsp;&nbsp;&nbsp;Para melhor compreensão de em qual parte da solução cada tecnologia utilizada se encaixa, a equipe Violeta elaborou o seguinte diagrama com a [arquitetura da solução proposta na sprint 1](../../sprint-1/proposta-arq.md#diagrama-de-blocos) e as respectivas indicações de onde cada tecnologia é implementada.

<p style={{textAlign: 'center'}}>Figura 1 - Arquitetura da solução com tecnologias usadas na sprint 3</p>

<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../static/img/sprint-3/backend/arquitetura_tecnologias_sprint_3.png").default} style={{width: 400}} alt="Arquitetura da solução com tecnologias usadas na sprint 3" />
        <br/>
    </div>
</div>

<p style={{textAlign: 'center'}}>Fonte: Elaboração própria</p>