import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import { Link } from "react-router-dom";

const Basket = () => {
  const [basket, setBasket] = useState([]);
  const [reRender, setReRender] = useState(false);
  const [sayac, setSayac] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:3004/basket")
      .then((res) => {
        setBasket(res.data);
      })
      .catch((err) => {});
  }, [reRender]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSayac((old) => old + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <Header bgClass="danger" reRender={reRender} />
      <h1>{sayac}</h1>
      {basket.length === 0 ? (
        <div>
          <p>
            Sepetiniz Boş. Alışverişe başlamak için{" "}
            <Link to={"/product-list"}>Tıklayın</Link>{" "}
          </p>
        </div>
      ) : (
        <div>
          {basket.map((item) => (
            <div key={item.id}>
              <h1>{item.name}</h1>
              <p>{item.brand}</p>
              <p>{item.price} TL</p>
              <button
                onClick={() => {
                  axios
                    .delete(`http://localhost:3004/basket/${item.id}`)
                    .then((res) => {
                      setReRender(!reRender);
                    })
                    .catch((err) => {});
                }}
              >
                Çıkar
              </button>
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Basket;
