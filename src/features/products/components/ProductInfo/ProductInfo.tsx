import { FC, useState } from 'react'
import classes from './productInfo.module.scss'
import MainButton from "@/components/ui/Buttons/MainButton/MainButton";
import Sizes from "@/components/Sizes/Sizes";
import LikeImg from "@/assets/icons/heart.svg?react";


// type Props = {
//   title: string;
//   describe: string;
//   gallery: string[];
//   price: number;
// };

const { title, describe, price } = {
  title: "HOODIE sweatshirt",
  describe:
    "Get to know - «French knitwear», you got to agree, sounds noble and beautiful. Be sure it doesn't just sound like that. Severity, modesty,  - «French knitwear», you got to agree, sounds noble and beautiful. Be sure it doesn't just sound like that. Severity, modesty, quality.",
  price: 90.3,
};

const ProductInfo:FC = () => {
    const [isLiked, setIsLiked] = useState(false);
    const [size, setSize] = useState("M");

  return (
          <div className={classes.product__data}>
            <h2 className={classes.product__title}>{title.toUpperCase()}</h2>
            <p className={classes.product__describe}>{describe}</p>
            <div className={classes.product__specification}>
              <div className={classes.product_specification_info}>
                <span className={classes.product__specification_key}>
                  Color:
                  <span className={classes.product__specification_value}>
                    {" "}
                    Ecru
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
                  Material:{" "}
                  <span className={classes.product__specification_value}>
                    100% cotton
                  </span>
                </span>
              </div>
              <Sizes active={size} setActive={setSize} />
            </div>
            <h4 className={classes.product__price}>$ {price}</h4>
            <div className={classes.product__buying}>
              <div className={classes.product__interactive}>
                <MainButton
                  width="medium"
                  active={isLiked}
                  action={() => setIsLiked(!isLiked)}
                  className={
                    classes[`product__liked-${isLiked ? "true" : "false"}`] +
                    " " +
                    classes.product__liked
                  }
                >
                  <LikeImg />
                </MainButton>
                <MainButton width="full">Add to cart</MainButton>
              </div>
              <span className={classes.product__delivery}>
                Delivery in 3-5 working days.
              </span>
            </div>
          </div>
  )
}

export default ProductInfo