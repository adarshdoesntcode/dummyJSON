import { useEffect, useState } from "react";

import "./App.css";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  useEffect(() => {
    axios
      .get("https://dummyjson.com/products")
      .then((data) => setProducts(data.data.products))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/carts/2")
      .then((data) => console.log(data.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
}

function Product(props) {
  const { id, title, description, price, brand, images } = props.product;
  return (
    <div>
      <p>id:{id}</p>
      <p>title:{title}</p>
      <p>description:{description}</p>
      <p>price:{price}</p>
      <p>brand:{brand}</p>
      <img src={images[0]} alt={title} />
    </div>
  );
}

function Cart() {}

export default App;
