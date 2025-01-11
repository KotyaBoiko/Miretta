import { Dispatch, FC, SetStateAction } from "react";
import classes from "./commonInput.module.scss";
type Props = {
  type?: string;
  placeholder?: string;
  id?: string;
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
};

const CommonInput: FC<Props> = ({
  type = "text",
  placeholder = "",
  id,
  value,
  onChange,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={classes.commonInput}
      id={id ? id : ""}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default CommonInput;
