import styles from './Tag.module.scss';

type TagProps = {
  children: React.ReactNode;
  color?: string;
};

function Tag({ children, color }: TagProps) {
  return (
    <div className={styles.tag} style={{ background: `${color}` }}>
      {children}
    </div>
  );
}

export default Tag;
