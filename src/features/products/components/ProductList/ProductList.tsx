import { FC } from "react";
import { useGetProductsByCategoryQuery } from "../../Api/productApi";
import ProductCard from "../ProductCard/ProductCard";
import classes from "./productList.module.scss";

type Props = {
  title: string;
  category: string | undefined
};

const ProductList: FC<Props> = ({ title, category }) => {

  if (!category) {
    return <>Not find products</>
  }
  const {data, isLoading, error} = useGetProductsByCategoryQuery(category)

  return (
    <div className="wrapper">
      <h2 className={classes.product__list_title}>{title}</h2>
      <div className={classes.product__list}>
        {data ? data.map((p) => {
          return (
            <ProductCard
              img={p.images[0]}
              title={p.title}
              price={p.price}
              id={p.id}
            />
          );
        }) : <div>No data</div>}
      </div>
    </div>
  );
};

export default ProductList;
