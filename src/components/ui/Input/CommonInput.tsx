import { Dispatch, FC, SetStateAction } from "react";
import classes from "./commonInput.module.scss";
type Props = {
  type?: string;
  placeholder?: string;
  id?: string;
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
  readOnly?: boolean,
  className?:string,
};

const CommonInput: FC<Props> = ({
  type = "text",
  placeholder = "",
  id,
  value,
  onChange,
  readOnly,
  className,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={classes[`common-input`] + ' ' + (className ? className : "")}
      id={id ? id : undefined}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      readOnly={readOnly}
    />
  );
};

export default CommonInput;
