import DeliveryInfo from "@/features/cart/components/DeliveryInfo/DeliveryInfo";
import classes from "./cartPage.module.scss";
import CartProducts from "@/features/cart/components/CartProducts/CartProducts";
import {
  useClearCartMutation,
  useGetCartQuery,
} from "@/features/cart/API/cartApi";
import MainButton from "@/components/ui/Buttons/MainButton/MainButton";
import Loader from "@/components/ui/Loader/Loader";
import EmptyCart from "@/features/cart/components/EmptyCart/EmptyCart";
import { auth } from "@/firebase/firebase-config";
import { useAppDispatch, useAppSelector } from "@/redux/types";
import { clearCartLocal } from "@/features/cart/slices/cartSlice";
const CartPage = () => {
  const [clearCart, {isLoading}] = useClearCartMutation();
  const { data } = useGetCartQuery(undefined, {skip: auth.currentUser ? false : true});
  const dataLocal = !auth.currentUser ? useAppSelector(state => state.cart.productsInCartNoAuthUser) : null;
  const dispatch = useAppDispatch()
  return (
    <div className={classes.cart}>
      <div className="wrapper">
        <h1 className={classes.cart__title}>SHOPPING CART</h1>
        <div className={classes.cart__container}>
          {dataLocal?.length || data?.length ? (
            <>
              <div className={classes.cart__products}>
                <CartProducts />
              </div>
              <div>
                <DeliveryInfo />
                <MainButton
                  action={() => auth.currentUser ? clearCart() : dispatch(clearCartLocal())}
                  width="full"
                  className={classes.cart__clear}
                >
                  {isLoading ? <Loader/> : 'Clear Cart'}
                </MainButton>
              </div>
            </>
          ) : (
            <EmptyCart/>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
