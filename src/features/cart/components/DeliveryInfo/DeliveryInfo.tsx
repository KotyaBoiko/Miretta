import MainButton from "@/components/ui/Buttons/MainButton/MainButton";
import { useAppSelector } from "@/redux/types";
import { calculateAmount } from "@/utils/calculateAmount";
import { useGetCartQuery } from "../../API/cartApi";
import DeliveryForm from "../DeliveryForm/DeliveryForm";
import classes from "./deliveryInfo.module.scss";

const DELIVERY_COST = 20;

const DeliveryInfo = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const { data } = useGetCartQuery(undefined, {
    skip: isAuth ? false : true,
  });
  const dataLocal = useAppSelector((state) => state.cart.productsInCartNoAuthUser)

  const totalPrice = isAuth
    ? calculateAmount(data!)
    : calculateAmount(dataLocal!);

  return (
    <div className={classes.cart__info}>
      <h2 className={classes.cart__info_title}>DELIVERY INFORMATION</h2>
      <DeliveryForm />
      <div className={classes.cart__info_line}></div>
      <div className={classes.cart__results}>
        <div className={classes.cart__results_component}>
          <span className={classes.cart__results_title}>SUBTOTAL</span>
          <span className={classes.cart__results_price}>$ {totalPrice}</span>
        </div>
        <div className={classes.cart__results_component}>
          <span className={classes.cart__results_title}>DELIVERY</span>
          <span className={classes.cart__results_price}>
            $ {DELIVERY_COST.toFixed(2)}
          </span>
        </div>
        <div className={classes.cart__results_component}>
          <span className={classes.cart__results_title}>TOTAL</span>
          <span
            className={
              classes["cart__results_price-total"] +
              " " +
              classes.cart__results_price
            }
          >
            $ {Math.round((totalPrice + DELIVERY_COST) * 100) / 100}
          </span>
        </div>
      </div>
      <MainButton width="full">Buy Now</MainButton>
    </div>
  );
};

export default DeliveryInfo;
