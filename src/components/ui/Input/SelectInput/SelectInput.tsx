import React, { FC, SetStateAction, useEffect, useRef, useState } from "react";
import CommonInput from "../CommonInput/CommonInput";
import classes from "./selectInput.module.scss";
import ArrowIcon from "@/assets/icons/arrow-right.svg?react"
import DoneIcon from "@/assets/icons/done.svg?react";


type Props = {
  freezing?: boolean;
  data: string[];
  writable?: boolean;
  onChange?: () => void;
  activeElementIndex: number;
  onChoose: React.Dispatch<SetStateAction<number>>;
};

const SelectInput: FC<Props> = ({
  freezing,
  data,
  writable,
  activeElementIndex,
  onChoose,
  onChange,
}) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const [isOpenList, setIsOpenList] = useState(false);

  useEffect(() => {
    if (!freezing) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpenList(false);
      }
    };

    if (isOpenList) {
      document.body.classList.add("modal-active");
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.body.classList.remove("modal-active");
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.body.classList.remove("modal-active");
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpenList]);

  return (
    <div className={classes.select} ref={dropdownRef}>
      <CommonInput
        value={data[activeElementIndex]}
        readOnly={!writable}
        onChange={() => {
          setIsOpenList((p) => !p);
          onChange && onChange();
        }}
        onClick={() => {
          setIsOpenList((p) => !p);
        }}
        className={classes.select__active}
        icon={<ArrowIcon className={`${classes.select__icon} ${isOpenList ? classes.select__icon_active : ''}`}/>}
      />
      <ul
        className={`${classes.select__list} ${
          isOpenList ? classes["select__list_active"] : ""
        }`}
      >
        {data.map((item, index) => {
          return (
            <li
              className={classes.select__variant}
              key={index}
              onClick={() => {
                setIsOpenList(false);
                onChoose(index);
              }}
            >
              {
                index == activeElementIndex
                  ? <>
                  {item}
                  <DoneIcon className={classes.select__variant_active}/>
                  </>
                  : item
              } 
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SelectInput;
