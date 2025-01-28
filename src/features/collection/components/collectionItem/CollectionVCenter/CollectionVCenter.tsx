import { FC } from "react";

import classes from "./collectionVCenter.module.scss";
import { mainLightColor } from "@/assets/styles/_variables";
import { MoreButton } from "@/components/ui/Buttons/MoreButton";
import { TCollectionProps } from "../type";
const CollectionVCenter: FC<Omit<TCollectionProps, "variant" | "smallImg">> = ({
  title,
  description,
  mainImageUrl,
}) => {
  return (
      <div className="wrapper">
    <div className={classes.collection}>
        <h2 className={classes.collection_title}>
          <span>{title}</span>
        </h2>
        <div className={classes.collection_container}>
          <div className={classes.collection_description}>
            <p>{description}</p>
          </div>
          <div className={classes.collection_btn}>
            <MoreButton
              path="/caps"
              text="Discover Collection"
              className={classes.collection__btn_theme}
            />
          </div>
        </div>
        <img
          src={mainImageUrl}
          alt={title}
          className={classes.collection_mainImg}
        />
      </div>
    </div>
  );
};

export { CollectionVCenter };
