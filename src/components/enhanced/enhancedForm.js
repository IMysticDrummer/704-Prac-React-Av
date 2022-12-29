import { useState } from 'react';

/**
 * This enhancer keeps the logic to manage the logic of state of a form component.
 * @param {React.Component} EnhancedForm Component to enhance
 * @param {*} initialData Ititial state to be managed
 * @returns EnhancedComponent, with the next props:
 *
 * *properties*: an object containing the actual state.
 *
 * *onChange*: an integrated simply event handle to change the state. This is very useful if all the elements of the form are controled by value.
 *
 * *setProperties*: transmit the inner state handle to let the user build his own event change handle.
 */
export default function enhancedForm(initialData) {
  return function (EnhancedForm) {
    const WithLogicForm = (props) => {
      const [properties, setProperties] = useState(initialData);

      const inputHandleChange = (event) => {
        setProperties({
          ...properties,
          [event.target.name]: event.target.value,
        });
      };

      //We'll send the setProperties method to let the enhanced forms to create their own handles and set to the general state
      return (
        <EnhancedForm
          {...props}
          properties={properties}
          onChange={inputHandleChange}
          setProperties={setProperties}
        />
      );
    };

    WithLogicForm.displayName = `WithLogicForm ${EnhancedForm.name}`;
    return WithLogicForm;
  };
}
