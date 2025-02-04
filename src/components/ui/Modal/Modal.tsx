import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import classes from "./modal.module.scss";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  classNameContent?: string;
  center?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  classNameContent,
  center = false,
}) => {
  if (!isOpen) return null;

  return createPortal(
    <div className={classes.modal__container} onClick={onClose}>
      <div
        className={
          classes.modal__content +
          " " +
          (classNameContent
            ? classNameContent
            : classes[`modal__content-center`]) +
          " " +
          (center ? classes[`modal__content-center`] : "")
        }
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.getElementById("modal-root")!
  );
};

export default Modal;
