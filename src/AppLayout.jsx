import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Cart from "./Cart";
import { useState } from "react";

function AppLayout() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
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
