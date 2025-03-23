import { useAppSelector } from "@/redux/types";
import { useGetCartQuery } from "../../API/cartApi";
import CartProductItem from "../CartProductItem/CartProductItem";
import classes from "./cartProducts.module.scss";

const CartProducts = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const { data } = useGetCartQuery(undefined, {
    skip: isAuth ? false : true,
  });
  const dataLocal = useAppSelector(
    (state) => state.cart.productsInCartNoAuthUser
  );
  return (
    <div className={classes.cart__products}>
      {data ? (
        data.map((p) => <CartProductItem product={p} key={p.variantId}/>)
      ) : dataLocal.length && !isAuth ? (
        dataLocal.map((p) => <CartProductItem product={p} key={p.variantId}/>)
      ) : (
        <p>No products in cart</p>
      )}
    </div>
  );
};

export default CartProducts;
