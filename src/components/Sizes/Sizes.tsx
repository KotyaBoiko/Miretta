import { FC } from "react";
import MainButton from "../ui/Buttons/MainButton/MainButton";
import classes from "./sizes.module.scss";

type Props = {
  active: string;
  setActive: React.Dispatch<React.SetStateAction<string>>;
};

const sizes = ["S", "M", "L", "XL"];

const Sizes: FC<Props> = ({ active, setActive }) => {
  return (
    <div className={classes.sizes}>
      {sizes.map((size, index) => (
        <MainButton
          width="full"
          key={index}
          action={() => setActive(size)}
          active={active === size}
        >
          <span className={classes.sizes__size}>{size}</span>
        </MainButton>
      ))}
    </div>
  );
};

export default Sizes;
