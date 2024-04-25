import Portal from '../Potal';
import styles from './Modal.module.scss';
import useCloseModal from '@/hooks/useModalClose';
import { useEffect, useRef } from 'react';

type ModalProps = {
  showModal: boolean;
  handleClose: () => void;
  children: React.ReactNode;
};

function Modal({ showModal, handleClose, children }: ModalProps) {
  const modalRef: any = useRef();
  useCloseModal(showModal, handleClose, modalRef);

  useEffect(() => {
    if (showModal) {
      document.body.style.cssText = `overflow: hidden;`;
      return () => {
        document.body.style.cssText = `overflow: scroll;`;
      };
    }
  }, [showModal]);

  return (
    showModal && (
      <Portal>
        <div className={styles.background}>
          <div className={styles.modalBox} ref={modalRef}>
            {children}
          </div>
        </div>
      </Portal>
    )
  );
}

export default Modal;
