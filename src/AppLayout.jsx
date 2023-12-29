import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Cart from "./Cart";
import { useEffect, useState } from "react";

function getLocalStorage(key) {
  const localData = localStorage.getItem(key);
  if (!localData) {
    return [];
  }
  return JSON.parse(localData);
}

function AppLayout() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(() => {
    return getLocalStorage("cart");
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={
            <App
              products={products}
              cart={cart}
              setProducts={setProducts}
              setCart={setCart}
            />
          }
        />
        <Route path="cart" element={<Cart cart={cart} setCart={setCart} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppLayout;
