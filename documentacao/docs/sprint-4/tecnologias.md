---
sidebar_position: 2
custom_edit_url: null
---

# Tecnologias utilizadas

## 1. Node.js

&emsp;&emsp;Node.js é um software que permite a execução de códigos em Javascript fora de um navegador web. Além de sua utilização para a confecção da documentação do projeto por meio do Docusaurus, o Node.js foi usado para o desenvolvimento do frontend da aplicação web da solução, uma vez que este permite a execução do React, que se baseia em Javascript.

## 2. Font Awesome

&emsp;&emsp;Font Awesome é uma biblioteca que disponibiliza ícones, fontes, entre outros itens visuais para desenvolvimento frontend. No projeto, ela foi utilizada em conjunto com o React para, principalmente, a implementação de ícones nas páginas da aplicação web da solução web.

## 3. React

&emsp;&emsp;React é uma biblioteca de desenvolvimento frontend baseada na criação e implementação facilitadas de componentes. Componentes são partes visuais simples do frontend de um sistema que podem possuir comportamentos independentes e, juntos, formar uma interface complexa. No contexto da solução desenvolvida pela equipe Violeta, essa funcionalidade permitiu, por exemplo, a criação de componentes que representam compartimentos dos layouts dos carrinhos de emergência que são reabastecidos pelo robô de braço mecânico.

## 4. CSS

&emsp;&emsp;CSS (Cascade Style Sheets) é uma linguagem para definição de estilo em páginas web. Sua função não é criar algoritmos por meio de programação ou definir a estrutura de uma página web, mas sim como é apresentado o estilo visual dessa estrutura que está ligada à parte de programação. Dentro do projeto desenvolvido, o CSS foi utilizado para ajustar cores, tamanho, formato, entre outras características dos componentes feitos a partir de React.

> Para informações mais aprofundadas sobre as tecnologias utilizadas para o desenvolvimento do frontend, confira a seção sobre [frontend](./frontend/frontend.md) desta documentação.

---

&nbsp;&nbsp;&nbsp;&nbsp;Para melhor compreensão de em qual parte da solução cada tecnologia utilizada se encaixa, a equipe Violeta elaborou o seguinte diagrama com a [arquitetura da solução proposta na sprint 1](../sprint-1/proposta-arq.md#diagrama-de-blocos) e as respectivas indicações de onde cada tecnologia é implementada.

<p style={{textAlign: 'center'}}>Figura 1 - Arquitetura da solução com tecnologias usadas na sprint 4</p>

<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../static/img/sprint-4/arquitetura_tecnologias_sprint_4.png").default} style={{width: 400}} alt="Arquitetura da solução com tecnologias usadas na sprint 4" />
        <br/>
    </div>
</div>

<p style={{textAlign: 'center'}}>Fonte: Elaboração própria</p>
