import { FC } from "react";
import classes from "./burgerMenuIcon.module.scss";

type Props = {
  onClick: () => void,
}

const BurgerMenuIcon:FC<Props> = ({ onClick }) => {
  return (
    <div className={classes.burger__container} onClick={() => onClick()}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default BurgerMenuIcon;
