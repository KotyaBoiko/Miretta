import LikeImg from "@/assets/icons/heart.svg?react";
import Sizes from "@/components/Sizes/Sizes";
import MainButton from "@/components/ui/Buttons/MainButton/MainButton";
import Loader from "@/components/ui/Loader/Loader";
import {
  useAddProductToCartMutation,
  useRemoveProductFromCartMutation
} from "@/features/cart/API/cartApi";
import { ICartProduct } from "@/features/cart/types/cartTypes";
import { useAppSelector } from "@/redux/types";
import { createVariantId } from "@/utils/createVariantId";
import { findFirstExistingKey } from "@/utils/findFirstExistingKey";
import { FC, useState } from "react";
import { useToggleLikeProductMutation } from "../../Api/productApi";
import { Product } from "../../types/product";
import classes from "./productInfo.module.scss";

const ProductInfo: FC<Product> = (data) => {
  const productsInCart = useAppSelector((state) => state.cart.productsInCart);

  const likedProducts = useAppSelector((state) => state.product.likedProducts);
  const [toggleLike, {isLoading: isLoadingLiking}] = useToggleLikeProductMutation();
  const isLiked = !!likedProducts.find(i => i === data.id)

  const [addToCart, { isLoading: isLoadingAdding }] = useAddProductToCartMutation();
  const [removeFromCart, {isLoading: isLoadingRemoving}] =
    useRemoveProductFromCartMutation();

    const [size, setSize] = useState(findFirstExistingKey(data.sizes));

  if (!data) {
    return <>No data</>;
  }

  const toggleProductToCart = (productVariant: ICartProduct) => {
    if (productsInCart.find((i) => i === productVariant.variantId)) {
      removeFromCart(productVariant.variantId);
    } else {
      addToCart(productVariant);
    }
  };

  return (
    <div className={classes.product__data}>
      <h2 className={classes.product__title}>{data.title.toUpperCase()}</h2>
      <p className={classes.product__describe}>{data.description}</p>
      <div className={classes.product__specification}>
        <div className={classes.product_specification_info}>
          <span className={classes.product__specification_key}>
            Color:
            <span className={classes.product__specification_value}>
              {" " + data.colors[0]}
            </span>
          </span>
          <span className={classes.product__specification_key}>
            SKU:
            <span className={classes.product__specification_value}>
              {" "}
              324254
            </span>
          </span>
          <span className={classes.product__specification_key}>
            Material:
            <span className={classes.product__specification_value}>
              {" " + data.materials}
            </span>
          </span>
        </div>
        <Sizes active={size} setActive={setSize} sizes={data.sizes} />
      </div>
      <h4 className={classes.product__price}>$ {data.price}</h4>
      <div className={classes.product__buying}>
        <div className={classes.product__interactive}>
          <MainButton
            width="medium"
            active={isLiked}
            action={() => toggleLike({ isLiked, productId: data.id })}
            className={
              classes[`product__liked-${isLiked ? "true" : "false"}`] +
              " " +
              classes.product__liked
            }
          >
            {isLoadingLiking ? <Loader/> : <LikeImg />}
          </MainButton>
          <MainButton
            width="full"
            disabled={!data.stock}
            active={
              !!productsInCart.find(
                (i) => i == createVariantId(data.id, size!, data.colors[0])
              )
            }
            action={() =>
              toggleProductToCart({
                id: data.id,
                variantId: createVariantId(data.id, size!, data.colors[0]),
                title: data.title,
                price: data.price,
                stock: data.stock,
                quantity: 1,
                size: size!,
                image: data.images[0],
                color: data.colors[0],
              })
            }
          >
            {isLoadingAdding || isLoadingRemoving ? (
              <Loader />
            ) : !data.stock ? (
              "No product"
            ) : productsInCart.find(
                (i) => i === createVariantId(data.id, size!, data.colors[0])
              ) ? (
              "Remove from cart"
            ) : (
              "Add to cart"
            )}
          </MainButton>
        </div>
        <span className={classes.product__delivery}>
          Delivery in 3-5 working days.
        </span>
      </div>
    </div>
  );
};

export default ProductInfo;
