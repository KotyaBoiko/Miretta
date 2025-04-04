import EmptyCartIcon from "@/assets/img/empty-cart.png";
import EmptyList from "@/components/EmptyList/EmptyList";
import MainButton from "@/components/ui/Buttons/MainButton/MainButton";
import Loader from "@/components/ui/Loader/Loader";
import {
  useClearCartMutation,
  useGetCartQuery,
} from "@/features/cart/API/cartApi";
import CartProducts from "@/features/cart/components/CartProducts/CartProducts";
import DeliveryInfo from "@/features/cart/components/DeliveryInfo/DeliveryInfo";
import { clearCartLocal } from "@/features/cart/slices/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/types";
import classes from "./cartPage.module.scss";

const CartPage = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const [clearCart, { isLoading }] = useClearCartMutation();
  const { data } = useGetCartQuery(undefined, { skip: isAuth ? false : true });
  const dataLocal = useAppSelector(
    (state) => state.cart.productsInCartNoAuthUser
  );
  const dispatch = useAppDispatch();
  return (
    <div className={classes.cart}>
      <div className="wrapper">
        <h1 className={classes.cart__title}>SHOPPING CART</h1>
        <div className={classes.cart__container}>
          {(dataLocal.length && !isAuth) || data?.length ? (
            <>
              <CartProducts />
              <div className={classes.cart__delivery}>
                <DeliveryInfo />
                <MainButton
                  action={() =>
                    isAuth ? clearCart() : dispatch(clearCartLocal())
                  }
                  width="full"
                  className={classes.cart__clear}
                >
                  {isLoading ? <Loader /> : "Clear Cart"}
                </MainButton>
              </div>
            </>
          ) : (
            <EmptyList
            img={EmptyCartIcon}
            title="Your cart is Empty!"
            description="Looks like you haven't added anything to your cart yet. Start shopping to fill it up! Browse through our categories and discover amazing products tailored just for you."
          />
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
