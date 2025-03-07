import { FC } from "react";
import classes from "./mainButton.module.scss";
import { Link } from "react-router";
type Props = {
  children: string | React.ReactNode;
  width?: "small" | "medium" | "full";
  active?: boolean;
  action?: () => void;
  className?: string;
  disabled?: boolean;
  to?: string;
};

const MainButton: FC<Props> = ({
  children,
  width = "medium",
  active,
  className,
  action,
  disabled = false,
  to,
}) => {
  return to && !disabled ? (
    <Link
      to={to}
      className={
        classes.btn +
        " " +
        classes[`btn-${active ? "active" : ""}`] +
        " " +
        classes[`btn-${width}`] +
        " " +
        className
      }
    >
      {children}
    </Link>
  ) : (
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
