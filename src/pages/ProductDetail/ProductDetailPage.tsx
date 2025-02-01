import { FC } from "react";
import { useParams } from "react-router";
import classes from "./productDetailPage.module.scss";

import CardsSlider from "@/components/CardsSlider/CardsSlider";
import ProductInfo from "@/features/products/components/ProductInfo/ProductInfo";
import { useGetProductQuery } from "@/features/products/Api/productApi";

const ProductDetailPage: FC = () => {
  const { id } = useParams();
  if (!id) return null;
  const { data, isLoading } = useGetProductQuery(id);
  if (!data) {
    return null;
  }
  return (
    <div className={classes.product}>
      <div className="wrapper">
        <div className={classes.product__container}>
          <div className={classes.product__gallery}>
            <CardsSlider slides={data.images}/>
          </div>
          <ProductInfo
            id={data.id}
            category={data.category}
            collections={data.collections}
            colors={data.colors}
            description={data.description}
            materials={data.materials}
            price={data.price}
            sizes={data.sizes}
            title={data.title}
            type={data.type}
            stock={data.stock}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
