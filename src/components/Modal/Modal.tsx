import Portal from './Potal';
import styles from './Modal.module.scss';

function Modal() {
  return (
    <Portal>
      <div className={styles.background}>
        <div className={styles.modalBox}></div>
      </div>
    </Portal>
  );
}

export default Modal;
