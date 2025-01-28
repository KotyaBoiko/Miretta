import productImg1 from "@/assets/img/ccapescapr-capldhelcap-vgoEPFKHiJU-unsplcapsh.jpg";
import productImg2 from "@/assets/img/ccapescapr-capldhelcap-vgoEPFKHiJU-unsplcapsh.jpg";
import productImg3 from "@/assets/img/dmitry-kropcapchev-capghiyL-DQcapI-unsplcapsh.jpg";
import productImg from "@/assets/img/jon-tyson-OCv_Rf0fZPo-unsplcapsh.jpg";
import productImg4 from "@/assets/img/kilycapn-sockcaplingum-qU9uFpbfXUo-unsplcapsh.jpg";
import productImg5 from "@/assets/img/nicolcaps-cool--glBOrg1xyM-unsplcapsh.jpg";
import { FC } from "react";
import ProductCard from "../ProductCard/ProductCard";
import classes from "./productList.module.scss";

type Props = {
  title: string;
};

const ProductList: FC<Props> = ({ title }) => {
  return (
    <div className="wrapper">
      <h2 className={classes.product__list_title}>{title}</h2>
      <div className={classes.product__list}>
        <ProductCard
          productImg={productImg}
          productName={"Cdddddddddddddddap"}
          productPrice={19.21}
          productId={1}
        />
        <ProductCard
          productImg={productImg1}
          productName={"Caffffffffp"}
          productPrice={19.21}
          productId={2}
        />
        <ProductCard
          productImg={productImg2}
          productName={"Capffffffffffffffffffffffffffffffffffffffffff"}
          productPrice={19.21}
          productId={3}
        />
        <ProductCard
          productImg={productImg3}
          productName={"Cafffffffffffp"}
          productPrice={19.21}
          productId={4}
        />
        <ProductCard
          productImg={productImg4}
          productName={"Cddddddddddddddddddddddddddddddddap"}
          productPrice={19.21}
          productId={5}
        />
        <ProductCard
          productImg={productImg5}
          productName={"Capssssssssssssssssssssssssssssssssssssssssssssssssss"}
          productPrice={19.21}
          productId={6}
        />
        <ProductCard
          productImg={productImg}
          productName={"Cadddddddddddddddddp"}
          productPrice={19.21}
          productId={7}
        />
      </div>
    </div>
  );
};

export default ProductList;
