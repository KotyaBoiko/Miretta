import { FC } from "react";
import { TCollectionProps } from "../type";
import classes from "./collectionVCenter.module.scss";
import { MoreButton } from "../../../../shared/Buttons/MoreButton";
import { mainLightColor } from "../../../../styles/_variables";
const CollectionVCenter: FC<TCollectionProps> = ({
  title,
  description,
  mainImageUrl,
}) => {
  return (
    <div className={classes.collection}>
      <h2 className={classes.collection_title}>
        <span>{title}</span>
      </h2>
      <div className={classes.collection_container}>
        <div className={classes.collection_description}>
          <p>{description}</p>
        </div>
        <div className={classes.collection_btn}>
          <MoreButton path="/caps" text="Discover Collection" color={mainLightColor}/>
        </div>
      </div>
        <img
          src={mainImageUrl}
          alt={title}
          className={classes.collection_mainImg}
        />
    </div>
  );
};

export default CollectionVCenter;
