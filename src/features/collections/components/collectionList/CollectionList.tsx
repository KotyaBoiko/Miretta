import { FC } from "react";
import {
  CollectionVCenter,
  CollectionVSide,
} from "../collectionItem";

import { useGetCollectionsQuery } from "../../collectionApi";
import classes from "./collectionsList.module.scss";

export type TCollection = {
  title: string;
  description: string;
  mainImg: string;
  additionalImg: string;
  code: number;
};

const CollectionList:FC = ({}) => {
  const {data: collections, isLoading} = useGetCollectionsQuery()
  return (
    <section className={classes.collections}>
      {isLoading ? <>Loading...</> : !collections ? <>No data</> : collections.map((collection, index) => {
        if (collection.code == 3) {
          return (
            <CollectionVCenter
              key={index}
              title={collection.title.toUpperCase()}
              description={collection.description}
              mainImg={collection.mainImg}
            />
          );
        }

        return (
          <CollectionVSide
            key={index}
            title={collection.title.toUpperCase()}
            description={collection.description}
            mainImg={collection.mainImg}
            additionalImg={collection.additionalImg}
            variant={index % 2 === 0 || index == 0 ? 'left' : 'right'}
          />
        );
      })}
    </section>
  );
};

export { CollectionList };

