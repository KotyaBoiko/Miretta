import CommonInput from "@/components/ui/Input/CommonInput";
import { useState } from "react";
import classes from "./deliveryForm.module.scss";
import { useAppSelector } from "@/redux/types";
import { auth } from "@/firebase/firebase-config";
import { Link } from "react-router";
import { USER_ROUTES_NAMES } from "@/router/user/userRoutesNames";
import Modal from "@/components/ui/Modal/Modal";

const DeliveryForm = () => {
  const user = useAppSelector((state) => state.user);
  const userAddresses = user.addresses;
  const [activeAutofill, setActiveAutofill] = useState(
    userAddresses ? userAddresses[0] : undefined
  );
  const [isOpenVariants, setIsOpenVariants] = useState(false);
  const [firstName, setFirstName] = useState(user.name || "");
  const [lastName, setLastName] = useState(user.surname || "");
  const [mobile, setMobile] = useState(user.phone || "");
  const [country, setCountry] = useState(activeAutofill?.country || "");
  const [city, setCity] = useState(activeAutofill?.city || "");
  const [address, setAddress] = useState(activeAutofill?.address || "");
  const [postCode, setPostCode] = useState(activeAutofill?.postCode || "");

  return (
    <>
      {auth.currentUser ? (
        <div className={classes.cart__form_autofill}>
          <span>Autofill:</span>
          <span className={classes["cart__form_autofill-trigger"]}>
            {userAddresses ? (
              <span onClick={() => setIsOpenVariants(true)}>
                Address {activeAutofill!.priority}
              </span>
            ) : (
              <Link to={USER_ROUTES_NAMES.Addresses}>Add addresses</Link>
            )}
          </span>
          <Modal isOpen={isOpenVariants} onClose={() => setIsOpenVariants(false)} classNameContent={classes["cart__form_autofill-variant"]}>
            <div className={classes["cart__form_autofill-content"]}>
              {userAddresses
                ? userAddresses.map((i) => {
                    return (
                      <span key={i.priority} onClick={() => setActiveAutofill(i)}>
                        Address {i.priority}
                      </span>
                    );
                  })
                : ""}
            </div>
          </Modal>
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
