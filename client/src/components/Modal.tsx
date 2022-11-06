import React, { useEffect } from "react";
import { ModalProps } from "../types/types";

const Modal = ({ message, closeModal }: ModalProps) => {
  useEffect(() => {
    setTimeout(() => {
      closeModal();
    }, 2500);
  }, [closeModal]);
  return <p className="modalText">{message}</p>;
};

export default Modal;
