import React, { FC, SetStateAction, useEffect, useRef, useState } from "react";
import CommonInput from "../CommonInput/CommonInput";
import classes from "./selectInput.module.scss";
import ArrowIcon from "@/assets/icons/arrow-right.svg?react";
import DoneIcon from "@/assets/icons/done.svg?react";

type Props = {
  freezing?: boolean;
  data: string[];
  activeElementIndex?: number;
  onChoose: React.Dispatch<SetStateAction<number>>;
};

const SelectInput: FC<Props> = ({
  freezing,
  data,
  activeElementIndex,
  onChoose,
}) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const [isOpenList, setIsOpenList] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpenList(false);
      }
    };

    if (freezing) {
      if (isOpenList) {
        document.body.classList.add("modal-active");
      } else {
        document.body.classList.remove("modal-active");
      }
    }

    if (isOpenList) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
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
        value={data[activeElementIndex || 0]}
        readOnly
        onClick={() => {
          setIsOpenList((p) => !p);
        }}
        className={classes.select__active}
        icon={
          <ArrowIcon
            className={`${classes.select__icon} ${
              isOpenList ? classes.select__icon_active : ""
            }`}
          />
        }
      />
      <ul
        className={`${classes.select__list} ${
          isOpenList ? classes["select__list_active"] : ""
        }`}
      >
        {data.map((item, index) => {
          return (
            <li
              className={`${classes.select__variant} ${
                index == activeElementIndex
                  ? classes.select__variant_active
                  : ""
              }`}
              key={index}
              onClick={() => {
                setIsOpenList(false);
                onChoose(index);
              }}
            >
              {index == activeElementIndex ? (
                <>
                  {item}
                  <DoneIcon
                    className={classes["select__variant_active-icon"]}
                  />
                </>
              ) : (
                item
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SelectInput;
