import { FC } from "react";
import classes from "./collectionVSide.module.scss"
import { MoreButton } from "../../../../shared/Buttons/MoreButton";
import { TCollectionProps } from "../type";

const CollectionVSide: FC<TCollectionProps> = ({
  title,
  description,
  mainImageUrl,
  smallImageUrl = "",
  variant
}) => {
  const mainImgClass =
    `${classes.collection_mainImg} ${classes[`collection_mainImg__${variant}`]}`;
  const textClass =
    `${classes.collection_text} ${classes[`collection_text__${variant}`]}`;

  const moreClass = `${classes.collection_more
  } ${classes[`collection_more__${variant}`]}`;

  return (
    <div className='wrapper'>
      <div className={classes.collection}>
        <img src={mainImageUrl} alt={title} className={mainImgClass} />
        <div className={textClass}>
          <h2 className={classes.collection_title}>{title}</h2>
          <div className={classes.collection_description}>
            <p>{description}</p>
          </div>
            <div className={moreClass}>
              <div className={classes.collection_more__btn}>
                <MoreButton path="/caps" text="Discover Collection" />
              </div>
              {smallImageUrl != "" && (
                <img
                  src={smallImageUrl}
                  alt={title}
                  className={classes.collection_more__smallImg}
                />
              )}
            </div>
        </div>
      </div>
    </div>
  );
};

export { CollectionVSide };
