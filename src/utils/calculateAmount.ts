import { ICartProduct } from "@/features/cart/types/cartTypes";

export const calculateAmount = (data: ICartProduct[]):number => {
  return Number(
    data!
      .reduce((amount, item) => {
        return amount + item.price * item.quantity;
      }, 0)
      .toFixed(2)
    )
}