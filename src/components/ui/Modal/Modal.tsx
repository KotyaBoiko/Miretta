import React from "react";
import { createPortal } from "react-dom";
import classes from "./modal.module.scss";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  classNameContent?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  classNameContent,
}) => {
  if (!isOpen) return null;

  return createPortal(
    <div className={classes.modal_container} onClick={onClose}>
      <div
        className={
          classes.modal_content +
          " " +
          (!classNameContent ? classes.modal_center : classNameContent)
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
