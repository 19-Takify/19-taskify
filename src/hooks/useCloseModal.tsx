import { useEffect } from 'react';

type UseCloseModal = (
  showModal: boolean,
  handleClose: () => void,
  modalRef: React.RefObject<HTMLDivElement>,
) => void;

const useCloseModal = (showModal, handleClose, modalRef) => {
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        handleClose();
      }
    };
    const handleEscapeKey = (e) => {
      if (e.keyCode === 27) {
        handleClose();
      }
    };

    if (showModal) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [showModal, handleClose, modalRef]);
};

export default useCloseModal;
