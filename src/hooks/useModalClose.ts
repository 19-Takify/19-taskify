import { useEffect } from 'react';

const useCloseModal = (
  showModal: boolean,
  handleClose: () => void,
  modalRef: React.RefObject<HTMLDivElement>,
) => {
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        handleClose();
      }
    };
    const handleEscapeKey = (e: KeyboardEvent) => {
      //esc key
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
