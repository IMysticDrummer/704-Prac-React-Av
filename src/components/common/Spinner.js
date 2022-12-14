import styles from './Spinner.module.css';

const Spinner = () => {
  return (
    <div className={styles.lds_circle}>
      <div></div>
    </div>
  );
};

export default Spinner;
