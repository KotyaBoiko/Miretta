import { Dispatch, FC, ReactNode, SetStateAction } from "react";
import classes from "./commonInput.module.scss";

type BaseProps = {
  type?: string;
  placeholder?: string;
  id?: string;
  value: string;
  className?: string;
  onClick?: () => void;
  icon?: ReactNode;
};

type ReadOnlyProps = BaseProps & {
  readOnly: true;
  onChange?: never | Dispatch<SetStateAction<string>> | ((value: string) => void);
};

type EditableProps = BaseProps & {
  readOnly?: false;
  onChange: Dispatch<SetStateAction<string>> | ((value: string) => void);
};

type Props = ReadOnlyProps | EditableProps;

const CommonInput: FC<Props> = ({
  type = "text",
  placeholder = "",
  id,
  value,
  onChange,
  readOnly,
  className,
  onClick,
  icon,
}) => {
  return (
    <div className={classes.input__common_wrapper}>
      <input
        type={type}
        placeholder={placeholder}
        className={classes.input__common + " " + (className ? className : "")}
        id={id ? id : undefined}
        value={value}
        onChange={
          readOnly
            ? undefined
            : (e) => {
                onChange(e.target.value);
              }
        }
        readOnly={readOnly}
        onClick={onClick}
      />
      {icon && <span className={classes.input__common_icon}>{icon}</span>}
    </div>
  );
};

export default CommonInput;
