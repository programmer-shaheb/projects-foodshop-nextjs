import styles from "../styles/EmptyCart.module.css";

const EmptyCart = () => {
  return (
    <>
      <div>
        <p className={styles.emptyCartMessage}>
          Your cart is currently empty. Add something and check back again.
        </p>
      </div>
    </>
  );
};

export default EmptyCart;
