import WishlistProducts from "@/features/products/components/WishlistProducts/WishlistProducts";
import classes from './wishlistPage.module.scss';
const WishlistPage = () => {
  return (
    <div className={classes.product__wishlist}>
      <div className="wrapper">
        <h1 className={classes.products__wishlist_title}>Wishlist</h1>
        <WishlistProducts />
      </div>
    </div>
  );
};

export default WishlistPage;
