import Link from 'next/link';
import styles from './styles/button.module.css';

const ShinyButton = () => {
  return (
    <div>
      <Link href="#">
        <button className={styles.button}>Explore</button>
      </Link>
    </div>
  );
};
export default ShinyButton;