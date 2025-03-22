import { FC, useState } from "react";
import {
  useAddProductToCartMutation,
  useRemoveProductFromCartMutation,
} from "@/features/cart/API/cartApi";
import {
  useAddProductToWishlistMutation,
  useRemoveProductFromWishlistMutation,
} from "../../Api/productApi";
import Sizes from "@/components/Sizes/Sizes";
import MainButton from "@/components/ui/Buttons/MainButton/MainButton";
import Loader from "@/components/ui/Loader/Loader";
import { ICartProduct } from "@/features/cart/types/cartTypes";
import { IProduct } from "../../types/product";
import { useAppDispatch, useAppSelector } from "@/redux/types";
import { createVariantId } from "@/utils/createVariantId";
import { findFirstExistingKey } from "@/utils/findFirstExistingKey";
import { IWishlistProduct } from "../../types/wishlistProduct";
import classes from "./productInfo.module.scss";

import LikeImg from "@/assets/icons/heart.svg?react";
import { auth } from "@/firebase/firebase-config";
import AuthModal from "@/features/auth/components/AuthModal/AuthModal";
import { addToCartLocal, removeFromCartLocal } from "@/features/cart/slices/cartSlice";

const ProductInfo: FC<IProduct> = (data) => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const productsInCart = useAppSelector((state) => state.cart.productsInCart);
  const likedProducts = useAppSelector((state) => state.product.likedProducts);

  const dispatch = useAppDispatch()

  const [addProductToWishlist, { isLoading: isLoadingLiking }] =
    useAddProductToWishlistMutation();
  const [removeProductFromWishlist, { isLoading: isLoadingDisliking }] =
    useRemoveProductFromWishlistMutation();
  const isLiked = !!likedProducts.find((i) => i === data.id);

  const [addToCart, { isLoading: isLoadingAdding }] =
    useAddProductToCartMutation();
  const [removeFromCart, { isLoading: isLoadingRemoving }] =
    useRemoveProductFromCartMutation();

  const [size, setSize] = useState(findFirstExistingKey(data.sizes));
  const [isShowAuth, setIsShowAuth] = useState(false);
  if (!data) {
    return <>No data</>;
  }

  const toggleProductToCart = (productVariant: ICartProduct) => {
    if (productsInCart.find((i) => i === productVariant.variantId)) {
      if (isAuth) {
        removeFromCart(productVariant.variantId);
      } else {
       dispatch(removeFromCartLocal(productVariant.variantId)) 
      }      
    } else {
      if (isAuth) {
        addToCart(productVariant);
      } else {
        dispatch(addToCartLocal(productVariant))
      }
    }
  };

  const likeProduct = (product: IWishlistProduct) => {
    if (isAuth) {
      toggleLikeProduct(product);
    } else {
      setIsShowAuth(true);
    }
  };

  const toggleLikeProduct = (product: IWishlistProduct) => {
    if (isLiked) {
      removeProductFromWishlist(product.id);
    } else {
      addProductToWishlist(product);
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
            action={() =>
              likeProduct({
                id: data.id,
                title: data.title,
                price: data.price,
                img: data.images[0],
              })
            }
            className={
              classes[`product__liked-${isLiked ? "true" : "false"}`] +
              " " +
              classes.product__liked
            }
          >
            {isLoadingLiking || isLoadingDisliking ? <Loader /> : <LikeImg />}
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
      <AuthModal
        type="signUp"
        isAuthModalOpen={isShowAuth}
        closeAuthModal={setIsShowAuth}
      />
    </div>
  );
};

export default ProductInfo;
