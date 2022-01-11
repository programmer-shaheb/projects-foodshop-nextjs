import Image from "next/image";
import classes from "../styles/Navbar.module.css";

const Navbar = () => {
  return (
    <div className={classes.container}>
      <div className={classes.item}>
        <div className={classes.callButton}>
          <Image src="/img/telephone.png" alt="" width="32" height="32" />
        </div>
        <div className={classes.texts}>
          <div className={classes.text}>ORDER NOW!</div>
          <div className={classes.text}>012 345 678</div>
        </div>
      </div>
      <div className={classes.item}>
        <ul className={classes.list}>
          <li className={classes.listItem}>Homepage</li>
          <li className={classes.listItem}>Products</li>
          <li className={classes.listItem}>Menu</li>
          {/* <Image src="/img/logo.png" alt="" width="160px" height="69px" /> */}
          <h1 style={{ fontSize: "50px" }}>Pizza Please!</h1>
          <li className={classes.listItem}>Events</li>
          <li className={classes.listItem}>Blog</li>
          <li className={classes.listItem}>Contact</li>
        </ul>
      </div>
      <div className={classes.item}>
        <div className={classes.cart}>
          <Image src="/img/cart.png" alt="" width="30px" height="30px" />
          <div className={classes.counter}>2</div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
