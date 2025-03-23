import MainButton from "@/components/ui/Buttons/MainButton/MainButton";
import { validate } from "@/utils/validate";
import { FC, useEffect, useState } from "react";
import {
  useRemoveProductFromCartMutation,
  useUpdateCartItemVariantMutation,
  useUpdateProductQuantityMutation,
} from "../../API/cartApi";

import Delete from "@/assets/icons/delete.svg?react";
import { useAppDispatch, useAppSelector } from "@/redux/types";
import classes from "./cartProductItem.module.scss";
import {
  updateCartItemQuantityLocal,
  removeFromCartLocal,
  updateCartItemVariantLocal,
} from "../../slices/cartSlice";
import { ICartProduct } from "../../types/cartTypes";
import Sizes from "@/components/Sizes/Sizes";
import { createVariantId } from "@/utils/createVariantId";
type Props = {
  product: ICartProduct;
};

const CartProductItem: FC<Props> = ({ product }) => {
  const productsInCart = useAppSelector((state) => state.cart.productsInCart);
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const [updateQuantity, {}] = useUpdateProductQuantityMutation();
  const [updateVariant, {}] = useUpdateCartItemVariantMutation();
  const [removeProduct, {}] = useRemoveProductFromCartMutation();

  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(product.quantity);
  const [size, setSize] = useState(product.size || null);
  const [inputValue, setInputValue] = useState(product.quantity);
  
  const handleUpdateQuantity = async (newQuantity: number) => {
    if (newQuantity < 1) {
      newQuantity = 1;
    }
    if (newQuantity > Math.min(product.stock, 20)) {
      newQuantity = Math.min(product.stock, 20);
    }
    if (newQuantity === quantity) {
      setQuantity(newQuantity);
      setInputValue(newQuantity);
      return;
    }
    if (isAuth) {
      await updateQuantity({
        quantity: newQuantity,
        variantId: product.variantId,
      });
    } else {
      dispatch(
        updateCartItemQuantityLocal({
          quantity: newQuantity,
          variantId: product.variantId,
        })
      );
    }
    setQuantity(newQuantity);
    setInputValue(newQuantity);
  };

  const handleUpdateVariant = async (newSize: string) => {
    const newCartProduct = {...product, size: newSize, variantId: createVariantId(product.id, newSize, product.color)}
    const newExist = productsInCart.findIndex(i => i[0] === newCartProduct.variantId)
    
    if (isAuth) {
      if(newExist != -1) {
        newCartProduct.quantity += productsInCart[newExist][1]
        await updateVariant({oldVariant: product.variantId, newCartProduct, updateExisting: true});
      } else {
        await updateVariant({oldVariant: product.variantId, newCartProduct});
      }
    } else {
      dispatch(
        updateCartItemVariantLocal({
          oldVariantId: product.variantId,
          newVariant: newCartProduct,
        })
      );
    }
  }

  useEffect(() => {
    if (product.quantity !== quantity) {
      setQuantity(product.quantity);
      setInputValue(product.quantity);
    }
  }, [product])

  return (
    <div className={classes.cart__product}>
      <div className={classes.cart__product_preview}>
        <img
          src={product.image}
          alt={product.title}
          className={classes.cart__product_img}
        />
      </div>
      <div className={classes.cart__product_info}>
        <p className={classes.cart__product_title}>
          {product.title.toUpperCase()}
        </p>
        <div>
          <Sizes active={size} setActive={setSize} sizes={product.sizes} minimalistic actionOnChange={handleUpdateVariant}/>
        </div>
        <p className={classes.cart__product_price}>${product.price}</p>
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
            disabled={quantity === product.stock || quantity === 20}
          >
            +
          </MainButton>
          <Delete
            className={classes.cart__product_delete}
            onClick={() =>
              isAuth
                ? removeProduct(product.variantId)
                : dispatch(removeFromCartLocal(product.variantId))
            }
          />
        </div>
      </div>
    </div>
  );
};

export default CartProductItem;
