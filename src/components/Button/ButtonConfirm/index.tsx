import styles from './ButtonConfirm.module.scss';

function ButtonConfirm() {
  return (
    <div className={styles.buttonConfirm}>
      <button className={styles.confirm}>수락</button>
      <button className={styles.deny}>거절</button>
    </div>
  );
}

export default ButtonConfirm;
