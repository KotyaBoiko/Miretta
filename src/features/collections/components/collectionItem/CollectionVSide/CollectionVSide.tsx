import { FC } from "react";
import classes from "./collectionVSide.module.scss";

import { TCollectionProps } from "../type";
import { MoreButton } from "@/components/ui/Buttons/MoreButton";
import { COMMON_ROUTES_NAMES } from "@/router/common/commonRoutesNames";

const CollectionVSide: FC<TCollectionProps> = ({
  title,
  description,
  mainImg,
  additionalImg = "",
  variant,
  id,
}) => {
  const mainImgClass = `${classes.collection__mainImg_picture} ${
    classes[`collection__mainImg_picture-${variant}`]
  }`;
  const textClass = `${classes.collection__text} ${
    classes[`collection__text-${variant}`]
  }`;

  const moreClass = `${classes.collection__more} ${
    classes[`collection__more-${variant}`]
  }`;

  return (
    <div className="wrapper">
      <div className={classes.collection}>
        <img src={mainImg} alt={title} className={mainImgClass} />
        <div className={textClass}>
          <h2 className={classes.collection__title}>{title}</h2>
          <div className={classes.collection__description}>
            <p>{description}</p>
          </div>
          <div className={moreClass}>
            <div className={classes.collection__more_btn}>
              <MoreButton path={COMMON_ROUTES_NAMES.Collection + `/${id}`} text="Discover Collection" />
            </div>
            {additionalImg != "" && (
              <img
                src={additionalImg}
                alt={title}
                className={classes.collection__more_smallImg}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export { CollectionVSide };
