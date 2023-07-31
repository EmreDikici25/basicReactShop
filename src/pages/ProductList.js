import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState(null);
  const [reRender, setReRender] = useState(false);
  useEffect(() => {
    axios
      .get("http://localhost:3004/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((err) => {});
  }, []);

  if (products === null) return <h1>Loading...</h1>;

  return (
    <div>
      <Header
        reRender={reRender}
        whichPage={"product-list"}
        bgClass="success"
      />
      <p>Product list</p>
      {products.length === 0 ? (
        <div>Kayıtlı bir ürün yoktur.</div>
      ) : (
        <div>
          {products.map((item) => (
            <div key={item.id}>
              <h1>{item.name}</h1>
              <p>{item.brand}</p>
              <p>{item.price} TL</p>
              <button
                onClick={() => {
                  axios
                    .post("http://localhost:3004/basket", item)
                    .then((res) => {
                      setReRender(!reRender);
                    })
                    .catch((err) => {});
                }}
              >
                Sepete Ekle
              </button>
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
