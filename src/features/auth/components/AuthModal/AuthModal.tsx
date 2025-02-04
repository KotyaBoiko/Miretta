import { FC, SetStateAction } from "react";

import MainButton from "@/components/ui/Buttons/MainButton/MainButton";
import AuthForm from "../AuthForm/AuthForm";
import FastAuth from "../FastAuth/FastAuth";
import Modal from "@/components/ui/Modal/Modal";
import { auth } from "@/firebase/firebase-config";
import { toggleAuthType } from "../../utils/toggleAuthType";

import classes from "./authModal.module.scss";
type Props = {
  type: "signIn" | "signUp";
  setAuthType: React.Dispatch<SetStateAction<"signIn" | "signUp">>
  isAuthModalOpen: boolean;
  closeAuthModal: React.Dispatch<SetStateAction<boolean>>;
}

const AuthModal: FC<Props> = ({ type, isAuthModalOpen, closeAuthModal, setAuthType }) => {

  const onCloseModal = () => {
    if (type === 'signIn') {
      document.querySelector(`.${classes.auth}`)?.classList.add(classes[`auth-close`])
      setTimeout(() => {
        closeAuthModal(false)
      }, 500)
    } else {
      document.querySelector(`.${classes.auth}`)?.classList.add(classes[`auth-close-center`])
      setTimeout(() => {
        closeAuthModal(false)
      }, 500)
    }
  }

  return (
    <Modal
      isOpen={isAuthModalOpen && !auth.currentUser}
      onClose={onCloseModal}
      classNameContent={classes[`auth-${type}`] + " " + classes.auth}
      center={type === 'signUp'}
    >
        <AuthForm type={type} />
        <FastAuth />
        <div className={classes.auth__other}>
          <span>-or-</span>
          <MainButton width="full" action={() => toggleAuthType(setAuthType)}>
            {type === "signIn" ? "Sign Up" : "Sign In"}
          </MainButton>
      </div>
    </Modal>
  );
};

export default AuthModal;
