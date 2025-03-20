import DoneIcon from "@/assets/icons/done.svg?react";
import { FC, useEffect, useRef, useState } from "react";
import classes from "./writableSelectInput.module.scss";

type Props = {
  freezing?: boolean;
  data: {
    displayInfo: string;
    shortDisplayInfo: string;
    id: string | number;
  }[];
  value: string;
  activeItem?: number | string;
  setActiveItem?: (ref: number | string) => void;
  onChange: (str: string) => void;
  placeholder?: string;
  getData?: (prompt: string) => void;
  minLengthVisible?: number;
  completed?: boolean;
};

const WritableSelectInput: FC<Props> = ({
  data,
  value,
  onChange,
  getData,
  activeItem,
  setActiveItem,
  completed = false,
  placeholder,
  minLengthVisible = 0,
  freezing,
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

  useEffect(() => {
    if (setActiveItem) {
      if (data.length && data[0].shortDisplayInfo === value) {
        setActiveItem(data[0].id);
      } else if (
        data.find((i) => i.id === activeItem)?.shortDisplayInfo != value
      ) {
        setActiveItem("");
      }
    }
  }, [data]);

  return (
    <div className={classes.select} ref={dropdownRef}>
      <input
        value={
          isOpenList
            ? value
            : completed
            ? data.find((i) => i.id === activeItem)?.displayInfo
            : value
        }
        onChange={(e) => {
          const newValue = e.target.value;
          onChange(newValue);
          if (getData && newValue.length >= minLengthVisible) {
            getData(newValue);
          }
        }}
        onClick={() => {
          setIsOpenList(true);
          if (value.length >= minLengthVisible && getData) {
            getData(value);
          }
        }}
        className={classes.select__active}
        placeholder={placeholder}
      />
      {completed && <DoneIcon className={classes.select__active_completed} />}
      <ul
        className={`${classes.select__list} ${
          isOpenList && data.length && value.length >= minLengthVisible
            ? classes["select__list_active"]
            : ""
        }`}
      >
        {data.map((item) => {
          return (
            <li
              className={`${classes.select__variant} ${
                item.id == activeItem ? classes.select__variant_active : ""
              }`}
              key={item.id}
              onClick={() => {
                setTimeout(() => setIsOpenList(false), 0);
                onChange(item.shortDisplayInfo);
                setActiveItem && setActiveItem(item.id);
                getData && getData(item.shortDisplayInfo);
              }}
            >
              {item.id === activeItem ? (
                <>
                  {item.displayInfo}
                  <DoneIcon
                    className={classes["select__variant_active-icon"]}
                  />
                </>
              ) : (
                item.displayInfo
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default WritableSelectInput;
