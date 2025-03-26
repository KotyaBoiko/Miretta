import { FC, SetStateAction } from "react";
import classes from "./burgerMenu.module.scss";
import { Link } from "react-router";

type Props = {
  isOpen: boolean;
  setIsOpen: (() => void) | React.Dispatch<SetStateAction<boolean>>;
  data: { name: string; to: string }[];
};

const BurgerMenu: FC<Props> = ({ isOpen, setIsOpen, data }) => {
  return (
    <>
      <div
        onClick={() => setIsOpen((p) => !p)}
        className={classes.burger__icon}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div
        className={`${classes.burger__container} ${
          isOpen ? classes.burger__container_active : ""
        }`}
        onClick={() => setIsOpen(false)}
      >
        <div
          className={`${classes.burger} ${
            isOpen ? classes.burger__active : ""
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={classes.cross} onClick={() => setIsOpen(false)}></div>
          {isOpen ? (
            <div
              className={classes.burger__list}
            >
              {data.map((i) => {
                return (
                  <Link
                    key={i.to + i.name}
                    to={i.to}
                    className={`
              ${classes.burger__link} ${
                      location.pathname == i.to
                        ? classes["burger__link-active"]
                        : ""
                    }
                `}
                onClick={() => setTimeout(() => setIsOpen(false), 400)}
                  >
                    {i.name}
                  </Link>
                );
              })}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default BurgerMenu;
