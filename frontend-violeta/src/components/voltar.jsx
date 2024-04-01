import React from "react";

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