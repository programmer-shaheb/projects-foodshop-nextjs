import Image from "next/image";
import Link from "next/link";
import styles from "../styles/PizzaCard.module.css";

const PizzaCard = ({ pizza }) => {
  return (
    <div className={styles.container}>
      <Link href={`/product/${pizza._id}`} passHref>
        <Image
          className={styles.img}
          src={pizza.img}
          alt={pizza.title}
          width="500"
          height="500"
        />
      </Link>
      <h1 className={styles.title}>{pizza.title}</h1>
      <span className={styles.price}>$ {`${pizza.prices[0]}`}</span>
      <p className={styles.desc}>
        {pizza.desc.length > 50
          ? `${pizza.desc.slice(0, 50)}...`
          : `${pizza.desc}`}
      </p>
    </div>
  );
};

export default PizzaCard;
