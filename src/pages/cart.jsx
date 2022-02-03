import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import axios from "axios";
import { useDispatch } from "react-redux";
import { reset } from "../redux/cartSlice";
import { useSelector } from "react-redux";
import styles from "../styles/Cart.module.css";
import OrderDetail from "../components/OrderDetail";
import EmptyCart from "../components/EmptyCart";
import { notify } from "../util/notify";

const Cart = () => {
  const [open, setOpen] = useState(false);
  const [cash, setCash] = useState(false);
  const cart = useSelector((state) => state.cart);
  const product = cart?.products.length > 0;
  const dispatch = useDispatch();
  const amount = cart.total;
  const currency = "USD";
  const style = { layout: "vertical" };
  const router = useRouter();

  const createOrder = async (data) => {
    try {
      const result = await axios.post(
        "https://elegant-wright-06721d.netlify.app/api/orders",
        data
      );

      if (result.status === 201) {
        notify("Order Done ✔️", "success");
        dispatch(reset());
        router.replace(`/orders/${result.data._id}`);
      }
    } catch (error) {
      notify("Order Cancel ❌", "error");
    }
  };

  const handleModal = (value) => {
    if (value === "open") {
      setCash(true);
    }
    if (value === "close") {
      setCash(false);
    }
  };

  const ButtonWrapper = ({ currency, showSpinner }) => {
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
      dispatch({
        type: "resetOptions",
        value: {
          ...options,
          currency: currency,
        },
      });
    }, [currency, showSpinner]);

    return (
      <>
        {showSpinner && isPending && <div className="spinner" />}
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[amount, currency, style]}
          fundingSource={undefined}
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: amount,
                    },
                  },
                ],
              })
              .then((orderId) => {
                return orderId;
              });
          }}
          onApprove={function (data, actions) {
            return actions.order.capture().then(function (details) {
              const shipping = details.purchase_units[0].shipping;
              createOrder({
                customer: shipping.name.full_name,
                address: shipping.address.address_line_1,
                total: cart.total,
                method: 1,
              });
            });
          }}
        />
      </>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Product</th>
              <th>Name</th>
              <th>Extras</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
            {!product && <EmptyCart />}
            {cart?.products.map((product) => (
              <tr className={styles.tr} key={product._id}>
                <td>
                  <div className={styles.imgContainer}>
                    <Image
                      src={product.img}
                      layout="fill"
                      objectFit="cover"
                      alt={product.title}
                    />
                  </div>
                </td>
                <td>
                  <span className={styles.name}>{product.title}</span>
                </td>
                <td>
                  {product.extras.length > 0 ? (
                    product.extras.map((extra) => (
                      <span key={extra._id} className={styles.extras}>
                        {extra.text},
                      </span>
                    ))
                  ) : (
                    <span className={styles.extras}>--</span>
                  )}
                </td>
                <td>
                  <span className={styles.price}>$ {product.price}</span>
                </td>
                <td>
                  <span className={styles.quantity}>{product.quantity}</span>
                </td>
                <td>
                  <span className={styles.total}>
                    $ {product.quantity * product.price}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>CART TOTAL</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Subtotal:</b>$ {cart.total}
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Discount:</b>$0.00
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Total:</b>$ {cart.total}
          </div>
          {open ? (
            <div className={styles.paymentMethods}>
              <button
                className={styles.payButton}
                onClick={() => handleModal("open")}
              >
                Cash On Delivery
              </button>
              <PayPalScriptProvider
                options={{
                  "client-id":
                    "ASZ4X48LMQCMZf0Z1ehZrZALSccQKUAEhCrvf8_GSRnj77VxXluDti9jhzKkfRjemS_yCxE_HYU-ugrG",
                  components: "buttons",
                  currency: "USD",
                  "disable-funding": "credit,card,p24",
                }}
              >
                <ButtonWrapper currency={currency} showSpinner={false} />
              </PayPalScriptProvider>
            </div>
          ) : (
            <button
              className={styles.button}
              disabled={!product}
              onClick={() => setOpen(true)}
            >
              CHECKOUT NOW!
            </button>
          )}
        </div>
      </div>
      {cash && (
        <OrderDetail
          closeModal={handleModal}
          total={cart.total}
          createOrder={createOrder}
        />
      )}
    </div>
  );
};

export default Cart;
