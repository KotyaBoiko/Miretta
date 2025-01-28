import { FC } from "react";
import { MoreButton } from "@/components/ui/Buttons/MoreButton";
import { TCollectionProps } from "../type";
import classes from "./collectionVCenter.module.scss";


const CollectionVCenter: FC<Omit<TCollectionProps, "variant" | "smallImg">> = ({
  title,
  description,
  mainImg,
}) => {
  return (
    <div className="wrapper">
      <div className={classes.collection}>
        <h2 className={classes.collection__title}>
          {title}
        </h2>
        <div className={classes.collection__container}>
          <p className={classes.collection__description}>
            {description}
          </p>
          <div className={classes.collection__btn}>
            <MoreButton
              path="/caps"
              text="Discover Collection"
              className={classes.collection__btn_theme}
            />
          </div>
        </div>
        <img
          src={mainImg}
          alt={title}
          className={classes.collection__mainImg}
        />
      </div>
    </div>
  );
};

export { CollectionVCenter };
