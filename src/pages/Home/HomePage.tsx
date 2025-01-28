import { FC } from "react";
import classes from "./home.module.scss";
import { CollectionList } from "@/features/collections/components/collectionList";

const HomePage: FC = () => {
  return (
    <main>
      <section className={classes.home__main}>
        <h1 className={classes.home__main_logo}>MIRETTA</h1>
      </section>
      <CollectionList />
    </main>
  );
};

export default HomePage;
