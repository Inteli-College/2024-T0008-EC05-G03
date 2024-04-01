---
sidebar_position: 3
custom_edit_url: null
---

# Componentes

&emsp;&emsp;No React, os componentes são blocos fundamentais de construção de interfaces de usuário reutilizáveis e modulares. Eles encapsulam partes específicas da interface do usuário e seu comportamento associado, permitindo que você construa e mantenha interfaces complexas de forma mais eficiente e organizada. Os componentes no React podem ser pensados como peças de LEGO que você pode juntar para criar uma aplicação completa.

&emsp;&emsp;Existem dois tipos principais de componentes no React: componentes de função e componentes de classe.

- Componentes de Função: Também conhecidos como componentes funcionais, são funções JavaScript que recebem um conjunto de propriedades (props) e retornam elementos React que descrevem o que deve ser exibido na interface do usuário. Esses componentes são mais simples e geralmente utilizados quando não precisam de estado interno ou de métodos de ciclo de vida.

- Componentes de Classe: São classes JavaScript que estendem a classe React.Component. Esses componentes podem conter estado interno e métodos de ciclo de vida, o que os torna mais poderosos e flexíveis em comparação com os componentes de função. Eles são úteis quando você precisa gerenciar estados ou quando precisa acessar os métodos do ciclo de vida do React.

&emsp;&emsp;A seguir, apresentamos os componentes feitos para o frontend do Violeta:

## Botão

&emsp;&emsp;No React, um componente de botão é um componente simples que encapsula o comportamento e a aparência de um botão em uma aplicação web. Um botão pode ser um elemento crucial em uma interface de usuário, pois é frequentemente usado para acionar ações, enviar formulários ou realizar outras interações com o usuário.

<p style={{textAlign: 'center'}}>Figura 1: Código do botão em JSX</p>

<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../static/img/sprint-4/frontend/botao-jsx.png").default} style={{width: 400}}/>
        <br/>
    </div>
</div>

<p style={{textAlign: 'center'}}>Fonte: Elaboração própria</p>

<p style={{textAlign: 'center'}}>Figura 2: Código do botão em CSS</p>

<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../static/img/sprint-4/frontend/botao-css.png").default} style={{width: 400}}/>
        <br/>
    </div>
</div>

<p style={{textAlign: 'center'}}>Fonte: Elaboração própria</p>

## NavBar

&emsp;&emsp;No React, uma barra de navegação (navbar) é um componente comum utilizado para criar menus de navegação em uma aplicação web. A navbar geralmente contém links para diferentes partes da aplicação, permitindo que os usuários naveguem facilmente entre as páginas ou seções do site.

<p style={{textAlign: 'center'}}>Figura 3: Código da NavBar em JSX</p>

<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../static/img/sprint-4/frontend/navbar-jsx.png").default} style={{width: 400}}/>
        <br/>
    </div>
</div>

<p style={{textAlign: 'center'}}>Fonte: Elaboração própria</p>

<p style={{textAlign: 'center'}}>Figura 4: Código da NavBar em CSS</p>

<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../static/img/sprint-4/frontend/navbar-css.png").default} style={{width: 400}}/>
        <br/>
    </div>
</div>

<p style={{textAlign: 'center'}}>Fonte: Elaboração própria</p>

## Modal

&emsp;&emsp;No React, um modal é um componente que exibe conteúdo sobreposto à página principal, geralmente usado para exibir informações adicionais, solicitar entrada do usuário ou confirmar ações importantes. Os modais são úteis quando você precisa capturar a atenção do usuário ou interromper temporariamente a interação com o restante da interface.

<p style={{textAlign: 'center'}}>Figura 5: Código do Modal em JSX</p>

<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../static/img/sprint-4/frontend/modal-jsx.png").default} style={{width: 400}}/>
        <br/>
    </div>
</div>

<p style={{textAlign: 'center'}}>Fonte: Elaboração própria</p>

<p style={{textAlign: 'center'}}>Figura 6: Código do Modal em CSS</p>

<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../static/img/sprint-4/frontend/modal-css.png").default} style={{width: 400}}/>
        <br/>
    </div>
</div>

<p style={{textAlign: 'center'}}>Fonte: Elaboração própria</p>
