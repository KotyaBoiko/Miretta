import { FC } from "react";
import MainButton from "../ui/Buttons/MainButton/MainButton";
import classes from "./sizes.module.scss";

type Props = {
  active: string | null;
  setActive: React.Dispatch<React.SetStateAction<string | null>>;
  sizes: {
    [key: string]: number;
  };
  minimalistic?: boolean;
  actionOnChange?: (size: string) => Promise<void> | void;
};

const Sizes: FC<Props> = ({
  active,
  setActive,
  sizes,
  minimalistic = false,
  actionOnChange
}) => {
  return (
    <div className={classes.sizes}>
      {Object.entries(sizes).map((size) => {
        if (size[1] == 0) {
          return (
            <MainButton
              width="full"
              key={size[0]}
              disabled={true}
              className={`${classes.sizes__btn} ${
                minimalistic ? classes.sizes__btn_minimalistic : ""
              }`}
            >
              <span
                className={`${classes.sizes__size} ${
                  minimalistic ? classes.sizes__size_minimalistic : ""
                }`}
              >
                {size[0]}
              </span>
            </MainButton>
          );
        } else {
          return (
            <MainButton
              width="full"
              key={size[0]}
              action={async () => {
                if (actionOnChange) {
                  await actionOnChange(size[0]);
                }
                setActive(size[0]);
              }}
              active={active === size[0]}
              className={`${classes.sizes__btn} ${
                minimalistic ? classes.sizes__btn_minimalistic : ""
              }`}
            >
              <span
                className={`${classes.sizes__size} ${
                  minimalistic ? classes.sizes__size_minimalistic : ""
                }`}
              >
                {size[0]}
              </span>
            </MainButton>
          );
        }
      })}
    </div>
  );
};

export default Sizes;
