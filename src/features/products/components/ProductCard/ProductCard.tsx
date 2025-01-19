import { FC } from "react";
import classes from "./productCard.module.scss";

type Props = {
  productImg: string;
  productName: string;
  productPrice: number;
};

const ProductCard: FC<Props> = ({ productName, productImg, productPrice }) => {
  return (
    <div className={classes.product_container}>
      <div className={classes.product_preview}>
        <img src={productImg} alt={productName} />
      </div>
      <div className={classes.product_describe}>
        <p className={classes.product_name}>{productName}</p>
        <p className={classes.product_price}>{productPrice}</p>
      </div>
    </div>
  );
};

export default ProductCard;
