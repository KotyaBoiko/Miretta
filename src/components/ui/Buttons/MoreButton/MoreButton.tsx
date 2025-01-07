import { FC } from "react";
import { Link } from "react-router";
import classes from "./moreButton.module.scss";
import { mainDarkColor } from "@/styles/_variables";
type Props = {
  path: string;
  text: string;
  color?: string;
};

const MoreButton: FC<Props> = ({ path, text, color = mainDarkColor }) => {
  return (
    <Link
      to={path}
      className={classes.btn}
      style={{ color: color, border: `1px solid ${color}` }}
    >
      {text}
    </Link>
  );
};

export { MoreButton };



