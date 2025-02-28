import { FC, useState } from "react";
import MainButton from "@/components/ui/Buttons/MainButton/MainButton";
import {
  useRemoveProductFromCartMutation,
  useUpdateProductQuantityMutation,
} from "../../API/cartApi";
import { validate } from "@/utils/validate";

import Delete from "@/assets/icons/Shape.svg?react";
import classes from "./cartProductItem.module.scss";
type Props = {
  id: string;
  variantId: string;
  img: string;
  title: string;
  price: number;
  startQuantity: number;
  stock: number;
};

const CartProductItem: FC<Props> = ({
  id,
  variantId,
  img,
  title,
  price,
  startQuantity,
  stock,
}) => {
  const [updateQuantity, {}] = useUpdateProductQuantityMutation();
  const [removeProduct, {}] = useRemoveProductFromCartMutation();

  const [quantity, setQuantity] = useState(startQuantity);
  const [inputValue, setInputValue] = useState(startQuantity);

  const handleUpdateQuantity = async (newQuantity: number) => {
    if (newQuantity < 1) {
      newQuantity = 1;
    }
    if (newQuantity > Math.min(stock, 20)) {
      newQuantity = Math.min(stock, 20);
    }
    if (newQuantity === quantity) {
      setQuantity(newQuantity);
      setInputValue(newQuantity);
      return;
    }
    await updateQuantity({ quantity: newQuantity, variantId });
    setQuantity(newQuantity);
    setInputValue(newQuantity);
  };

  return (
    <div className={classes.cart__product}>
      <div className={classes.cart__product_preview}>
        <img src={img} alt={title} className={classes.cart__product_img} />
      </div>
      <div className={classes.cart__product_info}>
        <p className={classes.cart__product_title}>{title.toUpperCase()}</p>
        <p className={classes.cart__product_price}>${price}</p>
        <div className={classes.cart__product_control}>
          <MainButton
            width="small"
            action={() => handleUpdateQuantity(quantity - 1)}
            disabled={quantity === 1}
          >
            -
          </MainButton>
          <input
            type="text"
            value={inputValue}
            maxLength={2}
            onKeyDown={(e) => {
              validate(e);
            }}
            onClick={(e) => e.currentTarget.select()}
            onChange={(e) => setInputValue(Number(e.target.value))}
            onBlur={(e) => handleUpdateQuantity(Number(e.target.value))}
            className={classes.cart__product_quantity}
          />
          <MainButton
            width="small"
            action={() => handleUpdateQuantity(quantity + 1)}
            disabled={quantity === stock || quantity === 20}
          >
            +
          </MainButton>
          <Delete
            className={classes.cart__product_delete}
            onClick={() => removeProduct(variantId)}
          />
        </div>
      </div>
    </div>
  );
};

export default CartProductItem;
