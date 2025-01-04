import { FC } from "react";
import { Collection, TCollectionProps } from "../collectionItem";
import mainImg1 from "../../../assets/img/171960011-dynamic1-pdp.webp";

import classes from "./collectionsList.module.scss";
type Props = {};

const collections:TCollectionProps[] = [
  {
    title: "SHIRTS, T-SHIRTS & POLO SHIRTS",
    description:
      "Discover a wide variety of T-shirts and shirts, combining comfort with modern design. From casual wear to statement pieces, find your perfect match in our versatile collection.",
    mainImageUrl: mainImg1,
    smallImageUrl: mainImg1,
    imageSide: "left",
    direction: "row-reverse",
  },
  {
    title: "PANTS",
    description:
      "Browse our range of pants, designed for every occasion. Whether you're dressing up or keeping it casual, our collection ensures style and functionality.",
    mainImageUrl: mainImg1,
    smallImageUrl: "/",
    imageSide: "right",
    direction: "row",
  },
  {
    title: "HOODIES, SWEATSHIRTS & SWEATERS",
    description:
      "Stay warm and stylish with our hoodies and outerwear. Perfect for layering, our selection offers both comfort and contemporary aesthetics for any season.",
    mainImageUrl: mainImg1,
    smallImageUrl: "/",
    imageSide: "left",
    direction: "row-reverse",
  },
  {
    title: "CAPS",
    description:
      "Explore our collection of stylish caps that add the perfect finishing touch to any outfit. Designed for comfort and fashion, our range includes classic and modern styles.",
    mainImageUrl: mainImg1,
    smallImageUrl: "/",
    imageSide: "right",
    direction: "row",
  },
];

const CollectionList:FC<Props> = ({}) => {
  return (
    <section className={classes.collections}>
    {collections.map((collection, index) => {
      return (
        <Collection
          key={index}
          title={collection.title}
          description={collection.description}
          mainImageUrl={collection.mainImageUrl}
          smallImageUrl={collection.smallImageUrl}
          imageSide={collection.imageSide}
          direction={collection.direction}
        />
      );
    })}
    </section>
  )
};

export { CollectionList };
