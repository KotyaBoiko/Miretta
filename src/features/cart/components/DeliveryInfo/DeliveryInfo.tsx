import MainButton from "@/components/ui/Buttons/MainButton/MainButton";
import DeliveryForm from "../DeliveryForm/DeliveryForm";
import classes from "./deliveryInfo.module.scss";
const DeliveryInfo = () => {
  return (
    <div className={classes.cart__info}>
      <h2 className={classes.cart__info_title}>DELIVERY INFORMATION</h2>
      <DeliveryForm />
      <div className={classes.cart__info_line}></div>
      <div className={classes.cart__results}>
        <div className={classes.cart__results_component}>
          <span className={classes.cart__results_title}>SUBTOTAL</span>
          <span className={classes.cart__results_price}>$ 100.00</span>
        </div>
        <div className={classes.cart__results_component}>
          <span className={classes.cart__results_title}>DELIVERY</span>
          <span className={classes.cart__results_price}>$ 20.00</span>
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
            $ 120.00
          </span>
        </div>
      </div>
      <MainButton width="full">Buy Now</MainButton>
    </div>
  );
};

export default DeliveryInfo;
