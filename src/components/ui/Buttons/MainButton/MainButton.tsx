import { FC } from "react";
import classes from "./mainButton.module.scss";
type Props = {
  children: string | React.ReactNode;
  width?: "content" | "medium" | "full";
  active?: boolean;
  action?: () => void;
  className?: string;
};

const MainButton: FC<Props> = ({ children, width = "medium", active, className, action }) => {
  return (
    <button
      className={
        classes.btn +
        " " +
        classes[`btn-${active ? "active" : ""}`] +
        " " +
        classes[`btn-${width}`] +
        " " +
        className
      }
      onClick={action}
    >
      {children}
    </button>
  );
};

export default MainButton;
