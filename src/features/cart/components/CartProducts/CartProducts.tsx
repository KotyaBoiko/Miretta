import { useGetCartQuery } from "../../API/cartApi";
import CartProductItem from "../CartProductItem/CartProductItem";
import classes from "./cartProducts.module.scss";

const CartProducts = () => {
  const { data, isLoading, isError } = useGetCartQuery();
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
      ) : (
        <p>No products in cart</p>
      )}
    </div>
  );
};

export default CartProducts;
