import CommonInput from "@/components/ui/Input/CommonInput";
import { useState } from "react";
import { useOutletContext } from "react-router";
import classes from "./profile.module.scss";

const PersonalInfo = () => {
  const editMode: boolean = useOutletContext();
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [password, setPassword] = useState("");

  return (
    <form className={classes.profile__info}>
      <label className={classes.profile__info_item}>
        <span>First Name</span>
        <CommonInput
          type="text"
          value={firstName}
          onChange={setFirstName}
          placeholder="First Name"
          readOnly={!editMode}
        />
      </label>
      <label className={classes.profile__info_item}>
        <span>Second name</span>
        <CommonInput
          type="text"
          value={secondName}
          onChange={setSecondName}
          placeholder="Second name"
          readOnly={!editMode}
        />
      </label>
      <label className={classes.profile__info_item}>
        <span>Email</span>
        <CommonInput
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="Email"
          readOnly={!editMode}
        />
      </label>
      <label className={classes.profile__info_item}>
        <span>Phone</span>
        <CommonInput
          type="phone"
          value={phone}
          onChange={setPhone}
          placeholder="+38 999 99 99 999"
          readOnly={!editMode}
        />
      </label>
      <label className={classes.profile__info_item}>
        <span>Password</span>
        <CommonInput
          type="password"
          value={password}
          onChange={setPassword}
          placeholder="Password"
          readOnly={editMode}
        />
      </label>
    </form>
  );
};

export default PersonalInfo;
