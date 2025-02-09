import CommonInput from "@/components/ui/Input/CommonInput";
import { COMMON_ROUTES_NAMES } from "@/router/common/commonRoutesNames";
import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import {
  useGetUserQuery,
  useSetUserEmailMutation,
  useSetUserPasswordMutation,
  useSetUserPersonalDataMutation,
} from "../../API/userApi";
import classes from "./personalInfo.module.scss";
import { IUserPersonalInfo } from "../../API/types";
import { TProfileMenu } from "../../libs/profileMenu";

const PersonalInfo = () => {
  const menuItem:TProfileMenu = useOutletContext();
  const { data, isError } = useGetUserQuery();
  const [setUserPersonalData, {}] = useSetUserPersonalDataMutation();
  const [setUserEmail, {}] = useSetUserEmailMutation();
  const [setUserPassword, {}] = useSetUserPasswordMutation();

  const navigate = useNavigate();
  if (data === undefined || isError) {
    navigate(COMMON_ROUTES_NAMES.Error);
    return null;
  }
  const [isEditPersonalInfo, setIsEditPersonalInfo] = useState(false);
  const [firstName, setFirstName] = useState(data.name || "");
  const [secondName, setSecondName] = useState(data.surname || "");
  const [dateOfBirth, setDateOfBirth] = useState(data.birth || "");
  const [phone, setPhone] = useState(data.phone || "");

  const [isEditEmail, setIsEditEmail] = useState(false);
  const [email, setEmail] = useState(data.email || "");

  const [isEditPassword, setIsEditPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const savePersonalInfo = () => {
    const data: Required<Omit<IUserPersonalInfo, "id" | "email">> = {
      name: firstName,
      surname: secondName,
      phone,
      birth: dateOfBirth,
    };
    setUserPersonalData(data);
    setIsEditPersonalInfo(false);
  };
  const cancelEditPersonalInfo = () => {
    setFirstName(data.name || "");
    setSecondName(data.surname || "");
    setPhone(data.phone || "");
    setDateOfBirth(data.birth || "");
    setIsEditPersonalInfo(false);
  };
  const saveEmail = () => {
    setUserEmail(data.email || "");
    setIsEditEmail(false);
  };
  const cancelEditEmail = () => {
    setEmail(data.email);
    setIsEditEmail(false);
  };
  const savePassword = () => {
    if (password.length < 6 || password != repeatPassword) return;
    setUserPassword(password);
    setIsEditPassword(false);
  };
  const cancelEditPassword = () => {
    setPassword("");
    setRepeatPassword("");
    setIsEditPassword(false);
  };

  return (
    <>
      <h2 className={classes.profile__title}>
        {menuItem.title}
        <span
          className={classes.profile__edit}
        >
          {isEditPersonalInfo ? (
            <>
              <span className={classes.profile__edit_btn} onClick={savePersonalInfo}>Save</span>
              <span className={classes.profile__edit_btn} onClick={cancelEditPersonalInfo}>Cancel</span>
            </>
          ) : (
            <span className={classes.profile__edit_btn} onClick={() => setIsEditPersonalInfo(true)}>Change</span>
          )}
        </span>
      </h2>
      <form className={classes.profile__info}>
        <label className={classes.profile__info_item}>
          <span>First Name</span>
          <CommonInput
            type="text"
            value={firstName}
            onChange={setFirstName}
            placeholder="No data"
            readOnly={!isEditPersonalInfo}
          />
        </label>
        <label className={classes.profile__info_item}>
          <span>Second Name</span>
          <CommonInput
            type="text"
            value={secondName}
            onChange={setSecondName}
            placeholder="No data"
            readOnly={!isEditPersonalInfo}
          />
        </label>
        <label className={classes.profile__info_item}>
          <span>Date of Birth</span>
          <CommonInput
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e)}
            readOnly={!isEditPersonalInfo}
          />
        </label>
        <label className={classes.profile__info_item}>
          <span>Phone</span>
          <CommonInput
            type="tel"
            value={phone}
            onChange={setPhone}
            placeholder="No data"
            readOnly={!isEditPersonalInfo}
          />
        </label>
        <h2 className={classes.profile__info_title}>
          Email
          <div
            className={classes.profile__edit}
          >
            {isEditEmail ? (
              <>
                <span className={classes.profile__edit_btn} onClick={saveEmail}>Save</span>
                <span className={classes.profile__edit_btn} onClick={cancelEditEmail}>Cancel</span>
              </>
            ) : (
              <span className={classes.profile__edit_btn} onClick={() => setIsEditEmail(true)}>Change</span>
            )}
          </div>
        </h2>
        <label className={classes.profile__info_item}>
          <span>Email</span>
          <CommonInput
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="rickgrimes@gmail.com"
            readOnly={!isEditEmail}
          />
        </label>
        <h2 className={classes.profile__info_title}>
          Password
          <div
            className={classes.profile__edit}
          >
            {isEditPassword ? (
              <>
                <span className={classes.profile__edit_btn} onClick={savePassword}>Save</span>
                <span className={classes.profile__edit_btn} onClick={cancelEditPassword}>Cancel</span>
              </>
            ) : (
              <span className={classes.profile__edit_btn} onClick={() => setIsEditPassword(true)}>Change</span>
            )}
          </div>
        </h2>
        <label className={classes.profile__info_item}>
          <span>New Password</span>
          <CommonInput
            type="password"
            value={password}
            onChange={setPassword}
            placeholder="Mystery"
            readOnly={!isEditPassword}
          />
        </label>
        <label className={classes.profile__info_item}>
          <span>Repeat Password</span>
          <CommonInput
            type="password"
            value={repeatPassword}
            onChange={setRepeatPassword}
            placeholder="Repeat mystery"
            readOnly={!isEditPassword}
          />
        </label>
      </form>
    </>
  );
};

export default PersonalInfo;
