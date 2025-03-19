import {CommonInput} from "@/components/ui/Input";
import { auth } from "@/firebase/firebase-config";
import { useAppSelector } from "@/redux/types";
import { USER_ROUTES_NAMES } from "@/router/user/userRoutesNames";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import classes from "./deliveryForm.module.scss";
import SelectInput from "@/components/ui/Input/SelectInput/SelectInput";

const DeliveryForm = () => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const user = useAppSelector((state) => state.user);

  const userAddresses =
    user.addresses === undefined
      ? undefined
      : user.addresses.length === 0
      ? undefined
      : user.addresses;

  const [firstName, setFirstName] = useState(user.name || "");
  const [lastName, setLastName] = useState(user.surname || "");
  const [mobile, setMobile] = useState(user.phone || "");
  const [country, setCountry] = useState(userAddresses ? userAddresses[0].country : "Україна");
  const [city, setCity] = useState(userAddresses ? userAddresses[0].cityDescription : "");
  const [address, setAddress] = useState(userAddresses ? userAddresses[0].address : "");
  const [postCode, setPostCode] = useState(userAddresses ? userAddresses[0].postCode : "");

  const [activeElement, setActiveElement] = useState(0);
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
    if (userAddresses) {
      setCountry(userAddresses[activeElement].country);
      setCity(userAddresses[activeElement].cityDescription);
      setAddress(userAddresses[activeElement].address);
      setPostCode(userAddresses[activeElement].postCode);
    }
  }, [activeElement]);

  return (
    <>
      {auth.currentUser ? (
        <div className={classes.cart__autofill}>
          <span className={classes.cart__autofill_title}>Autofill:</span>
          {userAddresses ? (
            <SelectInput data={userAddresses.map(i => `Address ${i.priority}`)} activeElementIndex={activeElement} onChoose={setActiveElement}/>
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
            readOnly
            // onChange={setCountry}
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
