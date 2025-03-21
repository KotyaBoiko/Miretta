import { FC, SetStateAction, useEffect, useState } from "react";

import MainButton from "@/components/ui/Buttons/MainButton/MainButton";
import AuthForm from "../AuthForm/AuthForm";
import FastAuth from "../FastAuth/FastAuth";
import Modal from "@/components/ui/Modal/Modal";
import { auth } from "@/firebase/firebase-config";
import { toggleAuthType } from "../../utils/toggleAuthType";

import classes from "./authModal.module.scss";
type Props = {
  underProfile?: boolean
  type: "signIn" | "signUp";
  isAuthModalOpen: boolean;
  closeAuthModal: React.Dispatch<SetStateAction<boolean>>;
}

const AuthModal: FC<Props> = ({ type, isAuthModalOpen, closeAuthModal, underProfile = false }) => {

  const [authType, setAuthType] = useState<'signIn' | "signUp">(type);

  const onCloseModal = () => {
    if (authType === 'signIn') {
      document.querySelector(`.${classes.auth}`)?.classList.add(classes[`auth-close`])
      setTimeout(() => {
        closeAuthModal(false)
      }, 290)
    } else {
      document.querySelector(`.${classes.auth}`)?.classList.add(classes[`auth-close-center`])
      setTimeout(() => {
        closeAuthModal(false)
      }, 290)
    }
  }

  return (
    <Modal
      isOpen={isAuthModalOpen && !auth.currentUser}
      onClose={onCloseModal}
      classNameContent={underProfile ? classes[`auth-${authType}`] : classes['auth-signUp']+ " " + classes.auth}
      center={underProfile ? authType === 'signUp': true}
    >
        <AuthForm type={authType} />
        <FastAuth />
        <div className={classes.auth__other}>
          <span>-or-</span>
          <MainButton width="full" action={() => toggleAuthType(setAuthType)}>
            {authType === "signIn" ? "Sign Up" : "Sign In"}
          </MainButton>
      </div>
    </Modal>
  );
};

export default AuthModal;
