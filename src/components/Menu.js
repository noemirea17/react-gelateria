import React, { useState } from "react";
import Gelato from "./Gelato";
import axios from "axios";
//import data from "../fakeData";

const url = "https://react--course-api.herokuapp.com/api/v1/data/gelateria";

const Menu = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const [prodotti, setProdotti] = useState();
  const [selected, setSelected] = useState(0);
  const [filterProducts, setFilterProducts] = useState();

  const [categorie, setCategorie] = useState([]);

  //const categorie = Array.from(new Set(prodotti.map((el) => el.categoria)));
  //categorie.unshift("all");

  const filtraProdotti = (categoria, index) => {
    setSelected(index);
    if (categoria === "all") {
      setFilterProducts(prodotti);
    } else {
      setFilterProducts(
        prodotti.filter((el) => (el.categoria === categoria ? el : ""))
      );
    }
  };

  React.useEffect(() => {
    (async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const response = await axios.get(url);
        setProdotti(response.data.data);
        setFilterProducts(response.data.data);
        const nuoveCategorie = Array.from(
          new Set(response.data.data.map((el) => el.categoria))
        );
        nuoveCategorie.unshift("all");
        setCategorie(nuoveCategorie);
        setIsLoading(false);
        setIsError(false);
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
      }
    })();
  }, []);
  return (
    <div className="container">
      <h4 style={{ textAlign: "center", textTransform: "uppercase" }}>
        Le nostre scelte
      </h4>
      {!isLoading && !isError ? (
        <>
          <div className="lista-categorie">
            {categorie.map((categoria, index) => {
              return (
                <button
                  onClick={() => filtraProdotti(categoria)}
                  key={index}
                  className={`btn btn-selector ${
                    index === selected && "active"
                  }`}
                >
                  {categoria}
                </button>
              );
            })}
          </div>
          <div className="vetrina">
            {filterProducts.map((el) => (
              <Gelato key={el.id} {...el} />
            ))}
          </div>
        </>
      ) : !isLoading && isError ? (
        <h4>Error</h4>
      ) : (
        <h4>Loading</h4>
      )}
    </div>
  );
};

export default Menu;
