import { Fragment } from 'react';
import styles from './SelectElement.module.css';
import { Button } from './Button';

/**
 *
 * @param {Object} param0 Object containing:
 *   - **label** of the Select Element
 *   - **name** of the Select Element
 *   - current **value** of the Select Element. This could be an array if it's multiple options
 *   - **multiple**: boolean indicating if this Select could be multiple
 *   - **options** is an array of strings with the options to be shown
 *   - **onChange** is the callback function to manager the onChange event
 *   - **handleReset** is the function to manager the onClick reset tags button
 * @returns {React.Component}
 */
const SelectElement = ({
  label,
  name,
  value,
  multiple,
  options,
  onChange,
  handleReset,
  ...props
}) => {
  /**
   * Prepares the options list to be contained in the select tag
   * @param {Array} options Strings with the options to select
   * @returns {HTML}
   */
  const optionsList = (options) => {
    return (
      <Fragment>
        {options.map((optionElement) => {
          return (
            <option
              key={optionElement}
              value={optionElement}
            >
              {optionElement}
            </option>
          );
        })}
      </Fragment>
    );
  };

  return (
    <article className={styles.selectClass}>
      <label htmlFor='selectElement'>{label}</label>
      <select
        name={name}
        id='selectElement'
        value={value}
        multiple={multiple}
        onChange={onChange}
      >
        {optionsList(options)}
      </select>
      {handleReset && (
        <Button
          name='reset'
          onClick={handleReset}
        >
          reset tags
        </Button>
      )}
    </article>
  );
};

export default SelectElement;
