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
        classes["main-btn"] +
        " " +
        classes[`main-btn_${active ? "active" : ""}`] +
        " " +
        classes[`main-btn_${width}`] +
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
