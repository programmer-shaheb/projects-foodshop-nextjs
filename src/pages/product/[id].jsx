import classes from "../../styles/Product.module.css";
import Image from "next/image";
import { useState } from "react";

const Product = () => {
  const [size, setSize] = useState(0);
  const pizza = {
    id: 1,
    img: "/img/pizza.png",
    name: "CAMPAGNOLA",
    price: [19.9, 23.9, 27.9],
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis arcu purus, rhoncus fringilla vestibulum vel, dignissim vel ante. Nulla facilisi. Nullam a urna sit amet tellus pellentesque egestas in in ante.",
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
        <h1 className={classes.title}>{pizza.name}</h1>
        <span className={classes.price}>${pizza.price[size]}</span>
        <p className={classes.desc}>{pizza.desc}</p>
        <h3 className={classes.choose}>Choose the size</h3>
        <div className={classes.sizes}>
          <div className={classes.size} onClick={() => setSize(0)}>
            <Image src="/img/size.png" layout="fill" alt="" />
            <span className={classes.number}>Small</span>
          </div>
          <div className={classes.size} onClick={() => setSize(1)}>
            <Image src="/img/size.png" layout="fill" alt="" />
            <span className={classes.number}>Medium</span>
          </div>
          <div className={classes.size} onClick={() => setSize(2)}>
            <Image src="/img/size.png" layout="fill" alt="" />
            <span className={classes.number}>Large</span>
          </div>
        </div>
        <h3 className={classes.choose}>Choose additional ingredients</h3>
        <div className={classes.ingredients}>
          <div className={classes.option}>
            <input
              type="checkbox"
              id="double"
              name="double"
              className={classes.checkbox}
            />
            <label htmlFor="double">Double Ingredients</label>
          </div>
          <div className={classes.option}>
            <input
              className={classes.checkbox}
              type="checkbox"
              id="cheese"
              name="cheese"
            />
            <label htmlFor="cheese">Extra Cheese</label>
          </div>
          <div className={classes.option}>
            <input
              className={classes.checkbox}
              type="checkbox"
              id="spicy"
              name="spicy"
            />
            <label htmlFor="spicy">Spicy Sauce</label>
          </div>
          <div className={classes.option}>
            <input
              className={classes.checkbox}
              type="checkbox"
              id="garlic"
              name="garlic"
            />
            <label htmlFor="garlic">Garlic Sauce</label>
          </div>
        </div>
        <div className={classes.add}>
          <input
            type="number"
            defaultValue={1}
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

export default Product;
