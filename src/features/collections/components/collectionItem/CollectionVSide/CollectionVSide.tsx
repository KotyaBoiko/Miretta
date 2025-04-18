import { FC } from "react";
import classes from "./collectionVSide.module.scss";

import { MoreButton } from "@/components/ui/Buttons/MoreButton";
import { TCollection } from "../../../type";

const CollectionVSide: FC<TCollection> = ({
  title,
  description,
  mainImg,
  additionalImg = "",
  variant,
  link
}) => {
  const mainImgClass = `${classes.collection__mainImg_picture} ${
    classes[`collection__mainImg_picture-${variant}`]
  }`;
  const additionImgClass = `${classes.collection__more_smallImg} ${
    classes[`collection__more_smallImg-${variant}`]
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
              <MoreButton path={link} text="Discover Collection" />
            </div>
            {additionalImg != "" && (
              <img
                src={additionalImg}
                alt={title}
                className={additionImgClass}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export { CollectionVSide };

