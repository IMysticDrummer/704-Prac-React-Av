import styles from './EnterElement.module.css';
import classNames from 'classnames';
import styled from 'styled-components';

/**
 * Component to show an enter+label field
 * This component is not working with radio, select and button types
 * @param {labelText} param0 labelText contains the message for the field label. It is possible to pass all permitted html attributes to configure the input field
 * @returns React.Component
 */
const EnterElement = ({ labelText, className, value, ...props }) => {
  if (
    props.type === 'button' ||
    props.type === 'radio' ||
    props.type === 'select'
  ) {
    return (
      <div>
        <p>
          ERROR!! This {props.type} input is not supported by this component
        </p>
      </div>
    );
  }

  const element = () => {
    if (props.type !== 'file' && props.type !== 'checkbox') {
      return (
        <input
          value={value || ''}
          {...props}
        />
      );
    } else {
      return <input {...props} />;
    }
  };
  return (
    <article className={classNames(styles.enterElementClass, className)}>
      <label htmlFor='inputElement'>{labelText}</label>
      {element()}
    </article>
  );
};

const StyledEnterElement = styled(EnterElement)`
  input {
    color: ${'var(--resalted-color)' || 'darkblue'};
    background-color: ${'var(--resalted-bg-color)' || 'whitesmoke'};
  }
`;

export default StyledEnterElement;
