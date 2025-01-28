import { FC } from "react";
import { useParams } from "react-router";
import classes from "./productDetailPage.module.scss";

import CardsSlider from "@/components/CardsSlider/CardsSlider";
import ProductInfo from "@/features/products/components/ProductInfo/ProductInfo";

const ProductDetailPage: FC = () => {
  const {} = useParams();
  return (
    <div className={classes.product}>
      <div className="wrapper">
        <div className={classes.product__container}>
          <div className={classes.product__gallery}>
            <CardsSlider />
          </div>
          <ProductInfo/>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
