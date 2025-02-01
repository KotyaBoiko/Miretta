import { FC } from "react";
import classes from "./mainButton.module.scss";
type Props = {
  children: string | React.ReactNode;
  width?: "content" | "medium" | "full";
  active?: boolean;
  action?: () => void;
  className?: string;
  disabled?: boolean;
};

const MainButton: FC<Props> = ({
  children,
  width = "medium",
  active,
  className,
  action,
  disabled = false,
}) => {
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
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default MainButton;
