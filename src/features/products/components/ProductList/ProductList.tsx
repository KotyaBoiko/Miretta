import { COMMON_ROUTES_NAMES } from "@/router/common/commonRoutesNames";
import { FC } from "react";
import { useNavigate } from "react-router";
import {
  useGetProductsByCategoryQuery,
  useGetProductsByCollectionQuery,
} from "../../Api/productApi";
import ProductCard from "../ProductCard/ProductCard";
import classes from "./productList.module.scss";

type Props = {
  category: string | undefined;
  collection: string | undefined;
};

const ProductList: FC<Props> = ({ category, collection }) => {
  const navigate = useNavigate();

  if (!collection && !category) {
    navigate(COMMON_ROUTES_NAMES.Home);
  }
  const { data } = category
    ? useGetProductsByCategoryQuery(category)
    : collection
    ? useGetProductsByCollectionQuery(collection)
    : {};
  return (
    <div className="wrapper">
      <h2 className={classes.product__list_title}>{"Products"}</h2>
      <div className={classes.product__list}>
        {data ? (
          data.map((p) => {
            return (
              <ProductCard
                key={p.id}
                img={p.images[0]}
                title={p.title}
                price={p.price}
                id={p.id}
                stock={p.stock}
              />
            );
          })
        ) : (
          <div>No data</div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
