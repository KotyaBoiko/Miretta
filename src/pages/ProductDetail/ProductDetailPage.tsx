import { FC, useState } from "react";
import { useParams } from "react-router";
import classes from "./productDetailPage.module.scss";
import LikeImg from "@/assets/icons/heart.svg?react";

// type Props = {
//   title: string;
//   describe: string;
//   gallery: string[];
//   price: number;
// };

import MainButton from "@/components/ui/Buttons/MainButton/MainButton";
import CardsSlider from "@/components/CardsSlider/CardsSlider";

const { title, describe, price } = {
  title: "HOODIE sweatshirt",
  describe:
    "Get to know - «French knitwear», you got to agree, sounds noble and beautiful. Be sure it doesn't just sound like that. Severity, modesty,  - «French knitwear», you got to agree, sounds noble and beautiful. Be sure it doesn't just sound like that. Severity, modesty, quality.",
  price: 90.3,
};
const ProductDetailPage: FC = () => {
  const [isLiked, setIsLiked] = useState(false);

  const { } = useParams();
  return (
    <div className={classes.product}>
      <div className="wrapper">
        <div className={classes.product__container}>
          <div className={classes.product__gallery}>
          <CardsSlider/>
          </div>
          <div className={classes.product__data}>
            <h2 className={classes.product__title}>{title.toUpperCase()}</h2>
            <div className={classes.product__describe}>{describe}</div>
            <div className={classes.product__detail}>
              <div className={classes.product_detail_info}>
                <span className={classes.product__detail_key}>
                  Color:{" "}
                  <span className={classes["product__detail_value"]}>Ecru</span>
                </span>
                <span className={classes.product__detail_key}>
                  SKU:{" "}
                  <span className={classes["product__detail_value"]}>324254</span>
                </span>
                <span className={classes.product__detail_key}>
                  Material:{" "}
                  <span className={classes["product__detail_value"]}>
                    100% cotton
                  </span>
                </span>
              </div>
              <div className={classes.product__sizes}>
                <MainButton width="full">
                  <span className={classes.product__size}>S</span>
                </MainButton>
                <MainButton width="full">
                  <span className={classes.product__size}>M</span>
                </MainButton>
                <MainButton width="full">
                  <span className={classes.product__size}>L</span>
                </MainButton>
                <MainButton width="full">
                  <span className={classes.product__size}>XL</span>
                </MainButton>
              </div>
            </div>
            <h4 className={classes.product__price}>$ {price}</h4>
            <div className={classes.product__buy}>
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
              <span className={classes.product__delivery}>Delivery in 3-5 working days.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
