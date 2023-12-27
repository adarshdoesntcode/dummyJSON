import { useNavigate } from "react-router-dom";

function Cart({ cart }) {
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => {
    return item.discountedPrice + sum;
  }, 0);

  return (
    <>
      <h1>terobaje ko bazar 🖕🏼</h1>

      <div className="container">
        <table id="cart" className="table table-hover table-condensed">
          <thead>
            <tr>
              <th style={{ width: "50%" }}>Product</th>
              <th style={{ width: "10%" }}>Price</th>
              <th style={{ width: "8%" }}>Quantity</th>
              <th style={{ width: "22%" }} className="text-center">
                Subtotal
              </th>
              <th style={{ width: "10%" }}></th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </tbody>
          <tfoot>
            <tr className="visible-xs">
              <td className="text-center">
                <strong>Total $ 5.11</strong>
              </td>
            </tr>
            <tr>
              <td>
                <a
                  className="btn btn-warning"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  <i className="fa fa-angle-left"></i> Continue Shopping
                </a>
              </td>
              <td colSpan="2" className="hidden-xs"></td>
              <td className="hidden-xs text-center">
                <strong>Total $ {total}</strong>
              </td>
              <td>
                <a href="#" className="btn btn-success btn-block">
                  Checkout <i className="fa fa-angle-right"></i>
                </a>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
}

function CartItem({ item }) {
  return (
    <tr>
      <td data-th="Product">
        <div className="row">
          <div className="col-sm-2 hidden-xs">
            <img src={item.thumbnail} alt="..." className="img-responsive" />
          </div>
          <div className="col-sm-10">
            <h4 className="nomargin">{item.title}</h4>
            <p>discount {item.discountPercentage}%</p>
          </div>
        </div>
      </td>
      <td data-th="Price">${item.price}</td>
      <td data-th="Quantity" className="flex">
        <button>-</button>
        <input
          type="number"
          className="quantity form-control text-center"
          value={item.quantity}
          disabled
        ></input>
        <button>+</button>
      </td>
      <td data-th="Subtotal" className="text-center">
        $ {item.discountedPrice}
      </td>
      <td className="actions" data-th="">
        <button className="btn btn-danger btn-sm">
          <i className="fa fa-trash-o"></i>
        </button>
      </td>
    </tr>
  );
}
export default Cart;
