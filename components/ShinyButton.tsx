import styles from './styles/button.module.css';

const ShinyButton = ({label}: {label: string}) => {
  return (
    <button className={styles.button}>{label}</button>
  );
};
export default ShinyButton;