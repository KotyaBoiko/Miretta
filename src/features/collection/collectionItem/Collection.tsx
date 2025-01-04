import { FC } from "react";
import classes from "./Collection.module.scss";
import { MoreButton } from "../../../shared/Buttons/MoreButton";

export type TCollectionProps = {
  title: string;
  description: string;
  mainImageUrl: string;
  smallImageUrl?: string;
  imageSide?: string;
  direction?: string;
};

const Collection: FC<TCollectionProps> = ({
  title,
  description,
  mainImageUrl,
  smallImageUrl = "",
  imageSide = "left",
  direction = "row",
}) => {
  const mainImgClass =
    classes.collection_mainImg +
    " " +
    classes[`collection_mainImg__${imageSide}`];
  const textClass =
    classes.collection_text + " " + classes[`collection_text__${imageSide}`];

  return (
    <div className={classes.collection}>
      <img src={mainImageUrl} alt={title} className={mainImgClass} />
      <div className={textClass}>
        <h2 className={classes.collection_title}>{title}</h2>
        <div className={classes.collection_description}>
          <div>{description}</div>
          <div className={classes.collection_btn}>
            <MoreButton path="/caps" text="Discover Collection" />
          </div>
          {smallImageUrl != "/" && (
            <img
              src={smallImageUrl}
              alt={title}
              className={classes.collection_smallImg}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export { Collection };
