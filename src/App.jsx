import { useEffect, useState } from "react";

import "./App.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function App({ products, cart, setProducts, setCart }) {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("https://dummyjson.com/products")
      .then((data) => setProducts(data.data.products))
      .catch((error) => console.log(error));
  }, [setProducts]);

  function handleAddtoCart(id) {
    setIsLoading(true);
    const duplicateItem = cart.find((item) => {
      return item.id === id;
    });

    if (duplicateItem) {
      axios
        .put("https://dummyjson.com/carts/1", {
          products: [
            {
              id: duplicateItem.id,
              quantity: duplicateItem.quantity + 1,
            },
          ],
        })
        .then((data) => {
          const newCart = cart.map((item) => {
            return item.id === duplicateItem.id ? data.data.products[0] : item;
          });
          setCart(newCart);
        })
        .catch((error) => console.log(error))
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      axios
        .post("https://dummyjson.com/carts/add", {
          userId: 1,
          products: [
            {
              id: id,
              quantity: 1,
            },
          ],
        })
        .then((data) => setCart((prev) => [...prev, data.data.products[0]]))
        .catch((error) => console.log(error))
        .finally(() => {
          setIsLoading(false);
        });
    }
  }
  return (
    <>
      <h1>terobaje ko bazar 🖕🏼</h1>
      <div className="sticky-cart" onClick={() => navigate("/cart")}>
        {isLoading ? "Adding.." : <i className="fa fa-shopping-cart"></i>} (
        {cart.length})
      </div>
      <div className="product-container">
        <div className="container">
          <div className="row">
            {products.map((product) => (
              <Product
                key={product.id}
                product={product}
                handleAddtoCart={handleAddtoCart}
                isLoading={isLoading}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function Product(props) {
  const { id, title, description, price, brand, thumbnail, rating, category } =
    props.product;
  const { handleAddtoCart, isLoading } = props;
  return (
    <div className="col-sm-4">
      <div className="product-card">
        <div className="card-thumbnail">
          <img className="img-responsive" src={thumbnail} />
        </div>
        <div className="card-content">
          <div
            className="send"
            onClick={() => {
              if (isLoading) return;
              handleAddtoCart(id);
            }}
          >
            <i className="fa fa-cart-plus"></i>
          </div>
          <h1 className="card-title">{title}</h1>
          <h2 className="card-sub-title">{brand}</h2>
          <p className="description">{description}</p>
          <p>Price ${price}</p>
          <ul className="list-inline post-meta">
            <li className="time-stamp">Rating {rating}</li>
            <li className="card-comment">{category}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
