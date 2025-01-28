import { FC } from "react";
import classes from "./productCard.module.scss";
import MainButton from "@/components/ui/Buttons/MainButton/MainButton";
import { Link } from "react-router";
import { COMMON_ROUTES_NAMES } from "@/router/common/commonRoutesNames";

type Props = {
  productImg: string;
  productName: string;
  productPrice: number;
  productId: number;
};

const ProductCard: FC<Props> = ({
  productName,
  productImg,
  productPrice,
  productId,
}) => {
  return (
    <div className={classes.card__container}>
      <Link
        to={`${COMMON_ROUTES_NAMES.Product}/${productId}`}
        className={classes.card__link}
      >
        <img src={productImg} alt={productName} className={classes.card__img} />
        <div className={classes.card__describe}>
          <span className={classes.card__name}>{productName}</span>
          <span className={classes.card__price}>$ {productPrice}</span>
        </div>
      </Link>
      <MainButton width="full" className={classes.card__add}>
        ADD TO CART
      </MainButton>
    </div>
  );
};

export default ProductCard;
