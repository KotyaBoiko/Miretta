import MainButton from "@/components/ui/Buttons/MainButton/MainButton";
import { useGetWishlistQuery } from "../../Api/productApi";
import WishlistProductCard from "../WishlistProductCard/WishlistProductCard";
import classes from "./wishlistProducts.module.scss";
import emptyWishlistPath from "@/assets/img/emptyWishlist.webp";
import { COMMON_ROUTES_NAMES } from "@/router/common/commonRoutesNames";
const WishlistProducts = () => {
  const { data } = useGetWishlistQuery();
  return data?.length ? (
    <div className={classes.products__wishlist_list}>
      {data.map((i) => {
        return (
          <WishlistProductCard
            title={i.title}
            img={i.img}
            price={i.price}
            id={i.id}
            key={i.id}
          />
        );
      })}
    </div>
  ) : (
    <div className={classes.products__wishlist_empty}>
      <img src={emptyWishlistPath} alt="empty" className={classes.products__wishlist_img}/>
      <h3 className={classes.products__wishlist_definition}>
        Your Wishlist is Empty!
      </h3>
      <p className={classes.products__wishlist_describe}>
        Looks like you haven't added any favorites yet. Start exploring and save
        items you love for later!
      </p>
      <MainButton to={COMMON_ROUTES_NAMES.Home} width="full" className={classes.products__wishlist_link}>Go Home</MainButton>
    </div>
  );
};

export default WishlistProducts;
