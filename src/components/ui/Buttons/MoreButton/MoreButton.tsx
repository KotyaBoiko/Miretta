import { FC } from "react";
import { Link } from "react-router";
import classes from "./moreButton.module.scss";
import { mainDarkColor } from "@/styles/_variables";
type Props = {
  path: string;
  text: string;
  color?: string;
};
import ArrowIcon from "@/assets/img/icons/arrow-right.svg?react"

const MoreButton: FC<Props> = ({ path, text, color = mainDarkColor }) => {
  return (
    <Link
      to={path}
      className={classes.btn}
      style={{ color: color, border: `1px solid ${color}` }}
    >
      {text}
      <ArrowIcon className={classes.arrow} style={{ stroke: color }}/>
    </Link>
  );
};

export { MoreButton };



