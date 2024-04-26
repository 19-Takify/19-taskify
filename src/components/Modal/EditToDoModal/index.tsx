import React from 'react';
import Modal from '../Modal';

type ModalProps = {
  showModal: boolean;
  handleClose: () => void;
};

function EditToDoModal({ showModal, handleClose }: ModalProps) {
  return (
    <Modal showModal={showModal} handleClose={handleClose}>
      EditToDoModal
    </Modal>
  );
}

export default EditToDoModal;

// import { useState } from "react"

// const [isOpen, setIsOpen]=useState(false)

// function handleClick(){
//   setIsOpen(true)
// }

// function handleClickb(){
//   setIsOpen(false)
// }

// <button onClick={handleClick}>모달열기</button>
// <EditToDoModal isOpen={isOpen} handleClickb={handleClickb}>
