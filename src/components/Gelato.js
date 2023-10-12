import React from "react";

const Gelato = ({ descrizione, prezzo, img, nome, categoria }) => {
  return (
    <article className="gelato">
      <div className="img-container">
        <img src={img} alt={nome} className="img" />
      </div>
      <div className="prd-info">
        <div className="prd-header">
          <div>
            <h5>{nome}</h5>
            <h6>{categoria}</h6>
          </div>
          <span className="prd-prezzo">{(prezzo / 100).toFixed(2)}€</span>
        </div>
        <p>{descrizione}</p>
      </div>
    </article>
  );
};

export default Gelato;
