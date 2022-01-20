import classes from "../../styles/Product.module.css";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";

const Product = ({ pizza }) => {
  const [price, setPrice] = useState(pizza.prices[0]);
  const [size, setSize] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [extras, setExtras] = useState([]);

  const changePrice = (number) => {
    setPrice(price + number);
  };

  const handleSize = (sizeIndex) => {
    const difference = pizza.prices[sizeIndex] - pizza.prices[size];
    setSize(sizeIndex);
    changePrice(difference);
  };

  const handleChange = (e, option) => {
    const isChecked = e.target.checked;

    if (isChecked) {
      changePrice(option.price);
      setExtras((prev) => [...prev, option]);
    } else {
      changePrice(-option.price);
      setExtras(extras.filter((extra) => extra._id !== option._id));
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.left}>
        <div className={classes.imgContainer}>
          <Image
            src={pizza.img}
            priority
            objectFit="contain"
            layout="fill"
            alt=""
          />
        </div>
      </div>
      <div className={classes.right}>
        <h1 className={classes.title}>{pizza.title}</h1>
        <span className={classes.price}>$ {price}</span>
        <p className={classes.desc}>{pizza.desc}</p>
        <h3 className={classes.choose}>Choose the size</h3>
        <div className={classes.sizes}>
          <div className={classes.size} onClick={() => handleSize(0)}>
            <Image src="/img/size.png" layout="fill" alt="" />
            <span className={classes.number}>Small</span>
          </div>
          <div className={classes.size} onClick={() => handleSize(1)}>
            <Image src="/img/size.png" layout="fill" alt="" />
            <span className={classes.number}>Medium</span>
          </div>
          <div className={classes.size} onClick={() => handleSize(2)}>
            <Image src="/img/size.png" layout="fill" alt="" />
            <span className={classes.number}>Large</span>
          </div>
        </div>
        <h3 className={classes.choose}>Choose additional ingredients</h3>
        <div className={classes.ingredients}>
          {pizza.extraOptions.map((option) => (
            <div className={classes.option} key={option._id}>
              <input
                type="checkbox"
                id={option.text}
                name={option.text}
                className={classes.checkbox}
                onChange={(e) => handleChange(e, option)}
              />
              <label htmlFor={option.text}>{option.text}</label>
            </div>
          ))}
        </div>
        <div className={classes.add}>
          <input
            type="number"
            defaultValue={1}
            onChange={(e) => setQuantity(e.target.value)}
            min="1"
            max="4"
            className={classes.quantity}
          />
          <button className={classes.button}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  const result = await axios.get(
    `http://localhost:3000/api/products/${params.id}`
  );

  return {
    props: {
      pizza: result.data,
    },
  };
};

export default Product;
