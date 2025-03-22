import { useAppSelector } from "@/redux/types";
import { useGetCartQuery } from "../../API/cartApi";
import CartProductItem from "../CartProductItem/CartProductItem";
import classes from "./cartProducts.module.scss";

const CartProducts = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const { data } = useGetCartQuery(undefined, {
    skip: isAuth ? false : true,
  });
  const dataLocal =
    useAppSelector((state) => state.cart.productsInCartNoAuthUser);
  return (
    <div className={classes.cart__products}>
      {data ? (
        data.map((p) => (
          <CartProductItem
            id={p.id}
            variantId={p.variantId}
            key={p.variantId}
            img={p.image}
            title={p.title}
            price={p.price}
            startQuantity={p.quantity}
            stock={p.stock}
          />
        ))
      ) : dataLocal.length && (!isAuth) ? (
        dataLocal.map((p) => (
          <CartProductItem
            id={p.id}
            variantId={p.variantId}
            key={p.variantId}
            img={p.image}
            title={p.title}
            price={p.price}
            startQuantity={p.quantity}
            stock={p.stock}
          />
        ))
      ) : (
        <p>No products in cart</p>
      )}
    </div>
  );
};

export default CartProducts;
