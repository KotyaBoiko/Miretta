import CommonInput from "@/components/ui/Input/CommonInput";
import { auth } from "@/firebase/firebase-config";
import { useAppSelector } from "@/redux/types";
import { USER_ROUTES_NAMES } from "@/router/user/userRoutesNames";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import classes from "./deliveryForm.module.scss";

const DeliveryForm = () => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const user = useAppSelector((state) => state.user);
  const userAddresses = user.addresses;
  const [activeAutofill, setActiveAutofill] = useState(
    userAddresses ? userAddresses[0] : undefined
  );
  const [firstName, setFirstName] = useState(user.name || "");
  const [lastName, setLastName] = useState(user.surname || "");
  const [mobile, setMobile] = useState(user.phone || "");
  const [country, setCountry] = useState(activeAutofill?.country || "");
  const [city, setCity] = useState(activeAutofill?.city || "");
  const [address, setAddress] = useState(activeAutofill?.address || "");
  const [postCode, setPostCode] = useState(activeAutofill?.postCode || "");

  const [activeElement, setActiveElement] = useState(0);
  const [isOpenList, setIsOpenList] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
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

  useEffect(() => {
    if (activeAutofill) {
      setCountry(activeAutofill.country)
      setCity(activeAutofill.city)
      setAddress(activeAutofill.address)
      setPostCode(activeAutofill.postCode)
    }
  }, [activeAutofill])

  return (
    <>
      {auth.currentUser ? (
        <div className={classes.cart__autofill_wrapper}>
          <span>Autofill:</span>
          {userAddresses ? (
            <div className={classes.cart__autofill} ref={dropdownRef}>
              <span
                onClick={() => {
                  setIsOpenList((p) => !p);
                }}
              >
                Address {userAddresses[activeElement].priority}
              </span>
              <ul
                className={`${classes.cart__autofill_list} ${
                  isOpenList ? classes["cart__autofill_list-active"] : ""
                }`}
              >
                {userAddresses.map((i, index) => {
                  return (
                    <li
                      className={classes.cart__autofill_variant}
                      key={i.priority}
                      onClick={() => {
                        setActiveAutofill(i);
                        setActiveElement(index);
                        setIsOpenList(false);
                      }}
                    >
                      Address {i.priority}
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : (
            <Link to={USER_ROUTES_NAMES.Addresses}>Add addresses</Link>
          )}
        </div>
      ) : (
        ""
      )}
      <form className={classes.cart__form}>
        <label>
          First Name
          <CommonInput
            type="text"
            placeholder="Alex"
            value={firstName}
            onChange={setFirstName}
          />
        </label>
        <label>
          Last Name
          <CommonInput
            type="text"
            placeholder="Smith"
            value={lastName}
            onChange={setLastName}
          />
        </label>
        <label>
          Mobile
          <CommonInput
            type="tel"
            placeholder="+380123456789"
            value={mobile}
            onChange={setMobile}
          />
        </label>
        <label>
          Country
          <CommonInput
            type="text"
            placeholder="Ukraine"
            value={country}
            onChange={setCountry}
          />
        </label>
        <label>
          City
          <CommonInput
            type="text"
            placeholder="Kyiv"
            value={city}
            onChange={setCity}
          />
        </label>
        <label>
          Address
          <CommonInput
            type="text"
            placeholder="Shevchenka St, 10"
            value={address}
            onChange={setAddress}
          />
        </label>
        <label>
          Post Code
          <CommonInput
            type="text"
            placeholder="01001"
            value={postCode}
            onChange={setPostCode}
          />
        </label>
      </form>
    </>
  );
};

export default DeliveryForm;
