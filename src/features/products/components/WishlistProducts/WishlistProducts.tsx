import emptyWishlistPath from "@/assets/img/emptyWishlist.webp";
import EmptyList from "@/components/EmptyList/EmptyList";
import { useGetWishlistQuery } from "../../Api/productApi";
import WishlistProductCard from "../WishlistProductCard/WishlistProductCard";
import classes from "./wishlistProducts.module.scss";
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
    <EmptyList
      img={emptyWishlistPath}
      title="Your Wishlist is Empty!"
      description="Looks like you haven't added any favorites yet. Start exploring and save
        items you love for later!"
    />
  );
};

export default WishlistProducts;
