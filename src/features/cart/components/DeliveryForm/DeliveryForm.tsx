import CommonInput from "@/components/ui/Input/CommonInput";
import { useState } from "react";
import classes from "./deliveryForm.module.scss";

const DeliveryForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [postCode, setPostCode] = useState("");

  return (
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
  );
};

export default DeliveryForm;
