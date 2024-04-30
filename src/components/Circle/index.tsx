import styles from './Circle.module.scss';

type CircleProps = {
  color: string;
  small: boolean;
};

function Circle({ color, small = false }: CircleProps) {
  return (
    <div
      className={`${styles.circle} ${small && styles.small}`}
      style={{ backgroundColor: `${color}` }}
    ></div>
  );
}

export default Circle;
