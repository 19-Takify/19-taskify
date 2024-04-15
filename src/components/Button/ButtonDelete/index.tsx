import styles from './ButtonDelete.module.scss';

function ButtonDelete({ ...rest }) {
  return (
    <button className={styles.buttonDelete} {...rest}>
      삭제
    </button>
  );
}

export default ButtonDelete;
