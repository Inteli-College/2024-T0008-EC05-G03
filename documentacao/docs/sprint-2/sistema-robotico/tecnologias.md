---
sidebar_position: 2
custom_edit_url: null
---

# Tecnologias Utilizadas

## 1. Dobot Magician Lite

&nbsp;&nbsp;&nbsp;&nbsp;O Dobot Magician Lite é um braço robótico versátil e acessível, projetado para aplicações educacionais e de prototipagem rápida. O robô utilizado oferece um alcance máximo de 340 milímetros - considerando os movimentos de seus 04 eixos (X, Y, Z e R) -, permitindo uma ampla gama de movimentos precisos através de uma estrutura leve e compacta, facilitando seu transporte e uso em diversos ambientes. Além disso, sua capacidade de carga de 250 gramas o torna adequado para a construção da solução pedida pelo parceiro de projeto.

&nbsp;&nbsp;&nbsp;&nbsp;Além de suas principais características, como seu alcance, precisão e capacidade de carga, o Dobot Magician Lite pode ser controlado através de interface de software intuitiva desenvolvida pelo grupo e, também, o hardware é compatível com uma variedade de sistemas operacionais, incluindo Windows, MacOS e Linux, tornando-o fácil de integrar em diferentes ambientes de desenvolvimento.

## 2. Biblioteca: Pydobot

&nbsp;&nbsp;&nbsp;&nbsp;Desenvolvida em 2022, a biblioteca Pydobot - que é uma biblioteca Python projetada para simplificar o controle do robô em questão - foi utilizada para programar e configurar o Dobot Magician. Através do seu uso, o braço robótico é facilmente programado para realizar uma variedade de tarefas de forma eficiente e precisa. Entretanto, para que o braço mecânico fosse capaz de movimentar-se de forma menos limitada, utilizando as juntas, os arquivos dobot.py e ptpMode.py foram modificados na biblioteca, de modo a permitir a movimentação linear do braço.

&nbsp;&nbsp;&nbsp;&nbsp;A biblioteca Pydobot se torna muito útil para o desenvolvimento da solução pois, entre suas principais funcionalidades estão o controle de movimento preciso através de movimentação específica com precisão milimétrica, a programação de tarefas complexas de forma sequencial, configuração de parâmetros como velocidade e aceleração, otimizando o desempenho em diferentes tarefas, permitindo adaptar o comportamento do braço robótico às necessidades específicas, também, comunicação serial -  permitindo o envio de comando e recebimento de dados, tornando a integração do Dobot com outros sistemas e dispositivos mais fácil - e sua facilidade de uso.

## 3. Biblioteca: Inquirer

&nbsp;&nbsp;&nbsp;&nbsp;A biblioteca Inquirer (CLI) é uma ferramenta para realizar consultas interativas em bancos de dados SQL de forma simples e intuitiva, podendo executar consultas SQL diretamente no terminal, visualizar os resultados de forma tabular e exportar os dados para diferentes formatos. Além disso, a biblioteca oferece recursos avançados, como o uso de variáveis, controle de transações e a possibilidade de conectar-se a diferentes bancos de dados SQL.

&nbsp;&nbsp;&nbsp;&nbsp;Usando a biblioteca Inquirer, suas funcionalidades permitem uma consulta interativa diretamente pelo terminal, visualização de resultados exibidos de forma tabular, facilitando a visualização e análise de dados, também, a biblioteca permite exportar os resultados das consultas para diferentes formatos, ademais, é possível utilizar variáveis nas consultas SQL, controlar as transações e, a biblioteca é compatível com uma variedade de bancos de dados SQL, então, permite que o usuário conecte a diferentes fontes de dados.

## 4. Biblioteca: Yaspin

&nbsp;&nbsp;&nbsp;&nbsp;A biblioteca Yaspin é uma ferramenta Python que permite criar e personalizar facilmente spinners (indicadores de carregamento) e barras de progresso para tornar a experiência do usuário mais interativa durante a execução de tarefas demoradas no terminal, sendo possível adicionar spinners e barras de progresso de forma simples e elegante aos seus scripts Python, proporcionando uma melhor experiência visual para o usuário.

&nbsp;&nbsp;&nbsp;&nbsp;A biblioteca permite personalizar os spinners, alterando tamanho e comportando, cores e estilos dos spinners e barras de progresso, também suporta a criação de barras de progresso e interação com threads e processos em Python.

---

&nbsp;&nbsp;&nbsp;&nbsp;Para melhor compreensão de em qual parte da solução cada tecnologia utilizada se encaixa, a equipe Violeta elaborou o seguinte diagrama com a [arquitetura da solução proposta na sprint 1](../../sprint-1/proposta-arq.md#diagrama-de-blocos) e as respectivas indicações de onde cada tecnologia é implementada.

<p style={{textAlign: 'center'}}>Figura 1 - Arquitetura da solução com tecnologias usadas na sprint 2</p>

<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../static/img/sprint-2/sistema-robotico/arquitetura_tecnologias_sprint_2.png").default} style={{width: 400}} alt="Arquitetura da solução com tecnologias usadas na sprint 2" />
        <br />
    </div>
</div>

<p style={{textAlign: 'center'}}>Fonte: Elaboração própria</p>