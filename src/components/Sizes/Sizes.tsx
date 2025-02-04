import { FC } from "react";
import MainButton from "../ui/Buttons/MainButton/MainButton";
import classes from "./sizes.module.scss";

type Props = {
  active: string | null;
  setActive: React.Dispatch<React.SetStateAction<string | null>>;
  sizes: {
    [key: string]: number
  }
};

const Sizes: FC<Props> = ({ active, setActive, sizes }) => {

  return (
    <div className={classes.sizes}>
      {Object.entries(sizes).map((size) => {
        if (size[1] == 0) {
          return <MainButton
          width="full"
          key={size[0]}
          disabled={true}
          className={classes.sizes__btn}
        >
          <span className={classes.sizes__size}>{size[0]}</span>
        </MainButton>
        }
        return <MainButton
          width="full"
          key={size[0]}
          action={() => setActive(size[0])}
          active={active === size[0]}
          className={classes.sizes__btn}
        >
          <span className={classes.sizes__size}>{size[0]}</span>
        </MainButton>
})}
    </div>
  );
};

export default Sizes;
