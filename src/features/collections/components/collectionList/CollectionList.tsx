import { FC } from "react";
import { CollectionVCenter, CollectionVSide } from "../collectionItem";
import { collections } from "../../data/collectionsData";
import classes from "./collectionsList.module.scss";

const CollectionList: FC = () => {
  return (
    <section className={classes.collections}>
      {collections.map((collection, index) => {
        if (collection.variant == 'center') {
          return (
            <CollectionVCenter
              key={collection.title + index + collection.mainImg}
              title={collection.title.toUpperCase()}
              description={collection.description}
              mainImg={collection.mainImg}
              link={collection.link}
            />
          );
        }

        return (
          <CollectionVSide
            key={collection.title + index + collection.mainImg}
            title={collection.title.toUpperCase()}
            description={collection.description}
            mainImg={collection.mainImg}
            additionalImg={collection.additionalImg}
            variant={index % 2 === 0 || index == 0 ? "left" : "right"}
            link={collection.link}
          />
        );
      })}
    </section>
  );
};

export { CollectionList };

