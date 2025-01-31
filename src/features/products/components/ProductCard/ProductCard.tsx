import { FC } from "react";
import classes from "./productCard.module.scss";
import MainButton from "@/components/ui/Buttons/MainButton/MainButton";
import { Link } from "react-router";
import { COMMON_ROUTES_NAMES } from "@/router/common/commonRoutesNames";
import { ProductBasic } from "../../types/product";

const ProductCard: FC<ProductBasic> = ({
  title,
  img,
  price,
  id,
}) => {
  return (
    <div className={classes.card__container}>
      <Link
        to={`${COMMON_ROUTES_NAMES.Product}/${id}`}
        className={classes.card__link}
      >
        <img src={img} alt={title} className={classes.card__img} />
        <div className={classes.card__describe}>
          <span className={classes.card__name}>{title}</span>
          <span className={classes.card__price}>$ {price}</span>
        </div>
      </Link>
      <MainButton width="full" className={classes.card__add}>
        ADD TO CART
      </MainButton>
    </div>
  );
};

export default ProductCard;
