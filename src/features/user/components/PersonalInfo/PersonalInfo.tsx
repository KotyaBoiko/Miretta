import ConfirmPassword from "@/components/ConfirmPassword/ConfirmPassword";
import CommonInput from "@/components/ui/Input/CommonInput";
import Modal from "@/components/ui/Modal/Modal";
import { TOutletProfileData } from "@/pages/Profile/ProfilePage";
import { useState } from "react";
import { useOutletContext } from "react-router";
import { IUserPersonalInfo } from "../../API/types";
import {
  useSetUserEmailMutation,
  useSetUserPasswordMutation,
  useSetUserPersonalDataMutation
} from "../../API/userApi";
import classes from "./personalInfo.module.scss";

const PersonalInfo = () => {
  const {menuItem, data}: TOutletProfileData = useOutletContext();
  const [setUserPersonalData, {}] = useSetUserPersonalDataMutation();
  const [setUserEmail, {}] = useSetUserEmailMutation();
  const [setUserPassword, {}] = useSetUserPasswordMutation();

  const [checkingPassword, setCheckingPassword] = useState(false);
  const [isConfirmedPassword, setIsConfirmedPassword] = useState(false);

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
    const newData: Required<Omit<IUserPersonalInfo, "id" | "email">> = {
      name: firstName,
      surname: secondName,
      phone,
      birth: dateOfBirth,
    };
    setUserPersonalData(newData);
    setIsEditPersonalInfo(false);
  };
  const cancelEditPersonalInfo = () => {
    setFirstName(data.name || "");
    setSecondName(data.surname || "");
    setPhone(data.phone || "");
    setDateOfBirth(data.birth || "");
    setIsEditPersonalInfo(false);
  };

  const controlSavingSensitiveData = (callback: () => void) => {
    if (isConfirmedPassword) {
      callback();
      setIsConfirmedPassword(false);
    } else {
      setCheckingPassword(true);
    }
  };

  const saveEmail = () => {
    setUserEmail(email);
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
        <span className={classes.profile__edit}>
          {isEditPersonalInfo ? (
            <>
              <span
                className={classes.profile__edit_btn}
                onClick={savePersonalInfo}
              >
                Save
              </span>
              <span
                className={classes.profile__edit_btn}
                onClick={cancelEditPersonalInfo}
              >
                Cancel
              </span>
            </>
          ) : (
            <span
              className={classes.profile__edit_btn}
              onClick={() => setIsEditPersonalInfo(true)}
            >
              Change
            </span>
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
            onChange={setDateOfBirth}
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
          <div className={classes.profile__edit}>
            {isEditEmail ? (
              <>
                <span
                  className={classes.profile__edit_btn}
                  onClick={() => controlSavingSensitiveData(saveEmail)}
                >
                  Save
                </span>
                <span
                  className={classes.profile__edit_btn}
                  onClick={cancelEditEmail}
                >
                  Cancel
                </span>
              </>
            ) : (
              <span
                className={classes.profile__edit_btn}
                onClick={() => setIsEditEmail(true)}
              >
                Change
              </span>
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
          <div className={classes.profile__edit}>
            {isEditPassword ? (
              <>
                <span
                  className={classes.profile__edit_btn}
                  onClick={() => controlSavingSensitiveData(savePassword)}
                >
                  Save
                </span>
                <span
                  className={classes.profile__edit_btn}
                  onClick={cancelEditPassword}
                >
                  Cancel
                </span>
              </>
            ) : (
              <span
                className={classes.profile__edit_btn}
                onClick={() => setIsEditPassword(true)}
              >
                Change
              </span>
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
      <Modal
        isOpen={checkingPassword}
        onClose={() => setCheckingPassword(false)}
      >
        <ConfirmPassword
          setIsConfirmedPassword={setIsConfirmedPassword}
          setCheckingPassword={setCheckingPassword}
        />
      </Modal>
    </>
  );
};

export default PersonalInfo;
