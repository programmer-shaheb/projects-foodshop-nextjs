import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import classes from "../styles/Navbar.module.css";
import CartIcon from "./CartIcon";

const Navbar = () => {
  const [isCartHighlighted, setIsCartHighlighted] = useState(false);
  const quantity = useSelector((state) => state.cart.quantity);

  const cartClasses = `${classes.cart} ${
    isCartHighlighted ? classes.bump : ""
  }`;

  useEffect(() => {
    if (quantity === 0) {
      return;
    }
    setIsCartHighlighted(true);

    const timer = setTimeout(() => {
      setIsCartHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [quantity]);

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
          <Link href="/" passHref>
            <li className={classes.listItem}>Homepage</li>
          </Link>
          <li className={classes.listItem}>Products</li>
          <li className={classes.listItem}>Menu</li>
          <Image
            src="/img/pizzalian-logo.svg"
            alt="logo"
            width="220px"
            height="80px"
            className={classes.listItem}
          />
          <li className={classes.listItem}>Events</li>
          <li className={classes.listItem}>Blog</li>
          <Link href="/admin" passHref>
            <li className={classes.listItem}>Admin</li>
          </Link>
        </ul>
      </div>
      <div className={classes.item}>
        <div className={cartClasses}>
          <Link href="/cart" passHref>
            <span className={classes.icon}>
              <CartIcon />
            </span>
          </Link>
          <div className={classes.counter}>{quantity}</div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
