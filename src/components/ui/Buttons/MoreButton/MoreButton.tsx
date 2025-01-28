import { FC } from "react";
import { Link } from "react-router";
import classes from "./moreButton.module.scss";

type Props = {
  path: string;
  text: string;
  className?: string;
};
import ArrowIcon from "@/assets/icons/arrow-right.svg?react"

const MoreButton: FC<Props> = ({ path, text, className }) => {
  return (
    <Link
      to={path}      
      className={`${classes.more} ${className ? className : ''}`}
    >
      {text}
      <ArrowIcon className={classes.arrow}/>
    </Link>
  );
};

export { MoreButton };



