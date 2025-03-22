import { FC, useEffect } from "react";
import {
  CollectionVCenter,
  CollectionVSide,
} from "../collectionItem";

import { collectionApi, useGetCollectionsQuery } from "../../collectionApi";
import classes from "./collectionsList.module.scss";
import { useAppDispatch } from "@/redux/types";

const CollectionList:FC = () => {
  const {data: collections, isLoading} = useGetCollectionsQuery()
    const dispatch = useAppDispatch();
  return (
    <section className={classes.collections}>
      {isLoading ? <>Loading...</> : !collections ? <>No data</> : collections.map((collection, index) => {
        if (collection.code == 3) {
          return (
            <CollectionVCenter
              key={collection.id}
              title={collection.title.toUpperCase()}
              description={collection.description}
              mainImg={collection.mainImg}
              id={collection.id}
            />
          );
        }

        return (
          <CollectionVSide
            key={collection.id}
            title={collection.title.toUpperCase()}
            description={collection.description}
            mainImg={collection.mainImg}
            additionalImg={collection.additionalImg}
            variant={index % 2 === 0 || index == 0 ? 'left' : 'right'}
            id={collection.id}
          />
        );
      })}
    </section>
  );
};

export { CollectionList };

