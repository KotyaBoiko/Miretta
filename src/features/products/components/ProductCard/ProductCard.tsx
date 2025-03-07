import MainButton from "@/components/ui/Buttons/MainButton/MainButton";
import { COMMON_ROUTES_NAMES } from "@/router/common/commonRoutesNames";
import { FC } from "react";
import { Link } from "react-router";
import { ProductBasic } from "../../types/product";
import classes from "./productCard.module.scss";

const ProductCard: FC<ProductBasic> = ({
  title,
  img,
  price,
  id,
  stock,
}) => {

  return (
    <div
      className={
        classes.card__container + " " + (!stock ? classes["card-disable"] : "")
      }
    >
      <Link
        to={`${COMMON_ROUTES_NAMES.Product}/${id}`}
        className={classes.card__link}
      >
        <img src={img} alt={title} className={classes.card__img} />
        <div className={classes.card__describe}>
          <span className={classes.card__name}>{title}</span>
          <span className={classes.card__price}>$ {price}</span>
        </div>
      <MainButton
        width="full"
        className={classes.card__view}
        disabled={!stock}
      >
        {!stock ? "NO PRODUCT" : "VIEW PRODUCT"}
      </MainButton>
      </Link>
    </div>
  );
};

export default ProductCard;
