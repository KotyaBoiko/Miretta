import { FC } from "react";
import { Link } from "react-router";
import classes from "./moreButton.module.scss";
type Props = {
  path: string;
  text: string;
};

const MoreButton: FC<Props> = ({ path, text }) => {
  return <Link to={path} className={classes.btn}>{text}</Link>;
};

export { MoreButton };
