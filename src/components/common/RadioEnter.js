import { Fragment } from 'react';
import styles from './RadioEnter.module.css';

/**
 * This component shows a Radio Group Select.
 * You must pass:
 * - **label** to show in the fieldset
 * - **name** of the component
 * - array of **values** to configure the component. An object containing:
 *     - *id* of the radio button to create
 *     - *name* of the radio button to create
 *     - current *value* selected, to control the component
 * This component uses the current value (string value) to compare with de radiobutton value to know what's the actual checked element.
 * @param {Object} param0 {label, name, values, value, onChange, ...props}
 * @returns {React.Component}
 */
const RadioEnter = ({ label, name, values, value, onChange, ...props }) => {
  const radioInputGroup = (values, checkedValue, onChange) => {
    return (
      <Fragment>
        {values.map((valueMapped) => {
          const { id, value: val, label } = valueMapped;
          return (
            <Fragment key={id}>
              <input
                type='radio'
                id={id}
                name={name}
                value={val}
                checked={val === checkedValue}
                onChange={onChange}
              ></input>
              <label htmlFor={id}>{label}</label>
            </Fragment>
          );
        })}
      </Fragment>
    );
  };

  return (
    <fieldset className={styles.radioClass}>
      <legend>{label}</legend>
      {radioInputGroup(values, value, onChange)}
    </fieldset>
  );
};

export default RadioEnter;
