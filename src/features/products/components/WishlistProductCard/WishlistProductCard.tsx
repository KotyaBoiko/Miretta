import LikeIcon from "@/assets/icons/heart-remove.svg?react";
import MainButton from "@/components/ui/Buttons/MainButton/MainButton";
import { COMMON_ROUTES_NAMES } from "@/router/common/commonRoutesNames";
import { FC } from "react";
import {
  useRemoveProductFromWishlistMutation
} from "../../Api/productApi";
import classes from "./wishlistProductCard.module.scss";
type Props = {
  img: string;
  price: number;
  title: string;
  id: string;
};

const WishlistProductCard: FC<Props> = ({ img, price, title, id }) => {
  const [removeProductFromWishlist, {}] =
    useRemoveProductFromWishlistMutation();

  return (
    <div className={classes.products__wishlist}>
      <img src={img} alt="product" className={classes.products__wishlist_img} />
      <div className={classes.products__wishlist_info}>
        <h3 className={classes.products__wishlist_title}>{title}</h3>
        <span className={classes.products__wishlist_price}>$ {price}</span>
        <MainButton
          width="full"
          className={classes.products__wishlist_btn}
          to={COMMON_ROUTES_NAMES.Product + `/${id}`}
        >
          View Product
        </MainButton>
        <LikeIcon
          className={classes.products__wishlist_like}
          onClick={() => removeProductFromWishlist(id)}
        />
      </div>
    </div>
  );
};

export default WishlistProductCard;
