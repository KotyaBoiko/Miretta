import LikeImg from "@/assets/icons/heart.svg?react";
import Sizes from "@/components/Sizes/Sizes";
import MainButton from "@/components/ui/Buttons/MainButton/MainButton";
import { FC, useState } from "react";
import { Product } from "../../types/product";
import classes from "./productInfo.module.scss";
import { useToggleLikeProductMutation } from "../../Api/productApi";
import { useAddProductToCartMutation } from "@/features/cart/API/cartApi";
import Loader from "@/components/ui/Loader/Loader";
import { findFirstExistingKey } from "@/utils/findFirstExistingKey";
import { createVariantId } from "@/utils/createVariantId";

const ProductInfo: FC<Product> = (data) => {
  const [addToCart, { isLoading, isSuccess }] = useAddProductToCartMutation();

  const [isLiked, setIsLiked] = useState(false);
  const [size, setSize] = useState(findFirstExistingKey(data.sizes));
  const [toggleLike, {}] = useToggleLikeProductMutation();
  if (!data) {
    return <>No data</>;
  }

  const toggleLikeProduct = async (productId: string) => {
    await toggleLike({ isLiked, productId })
      .then(() => setIsLiked(!isLiked))
      .catch(() => alert("Something went wrong"));
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
            action={() => toggleLikeProduct(data.id)}
            className={
              classes[`product__liked-${isLiked ? "true" : "false"}`] +
              " " +
              classes.product__liked
            }
          >
            <LikeImg />
          </MainButton>
          <MainButton
            width="full"
            disabled={!data.stock}
            action={() =>
              addToCart({
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
            {isLoading ? (
              <Loader />
            ) : !data.stock ? (
              "No product"
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
