import styles from './ErrorElement.module.css';

/**
 * Error component. Shows the error message, and the error status or an alternative message (if the status is not aviable).
 * It's necessary to pass a function to handle the click over the component
 * @param {Object}} param0 {erro, altMessage, function}
 * @returns {React.Componente}
 */
const ErrorElement = ({ error, altMessage, handleErrorMessageClick }) => {
  if (error) {
    return (
      <section
        className={styles.errorMessageClass}
        onClick={handleErrorMessageClick}
      >
        {error.message}
        {-error.status || altMessage}
        <p></p>
        <p>Click in this message to continue</p>
      </section>
    );
  }
};

export default ErrorElement;
