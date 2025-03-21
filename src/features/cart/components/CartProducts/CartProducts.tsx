import { auth } from "@/firebase/firebase-config";
import { useGetCartQuery } from "../../API/cartApi";
import CartProductItem from "../CartProductItem/CartProductItem";
import classes from "./cartProducts.module.scss";
import { useAppSelector } from "@/redux/types";

const CartProducts = () => {
  const { data } = useGetCartQuery(undefined, {
    skip: auth.currentUser ? false : true,
  });
  const dataLocal =
    !auth.currentUser ?
    useAppSelector((state) => state.cart.productsInCartNoAuthUser): null;
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
      ) : dataLocal && !auth.currentUser ? (
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
