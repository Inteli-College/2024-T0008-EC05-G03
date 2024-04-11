import React from "react";

// Função para voltar para a página anterior
function acaoVoltar() {
  window.history.back();
}

const Voltar = () =>{
  return (
    <button onClick={acaoVoltar} type="submit" className="btVoltar" >
      Voltar
    </button>
  );
}


export default Voltar;