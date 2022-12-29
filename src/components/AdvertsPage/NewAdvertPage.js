import { Button } from '../common/Button.js';
import EnterElement from '../common/EnterElement.js';
import ErrorElement from '../common/ErrorElement.js';
import RadioEnter from '../common/RadioEnter.js';
import Page from '../Layout/Page.js';
import styles from './NewAdvertPage.module.css';
import Spinner from '../common/Spinner.js';
import { useDispatch, useSelector } from 'react-redux';
import { getUi } from '../../store/selectors.js';
import { newAdAction, uiResetError } from '../../store/actions.js';
import SelectTags from './SelectTags/SelectTags.js';
import enhancedForm from '../enhanced/enhancedForm.js';

const NewAdvertPage = ({ subTitle, properties, setProperties, ...props }) => {
  const { name, sale, price, tags } = properties;

  const dispatch = useDispatch();
  const { error, isLoading: isFetching } = useSelector(getUi);

  const disableButton = () => {
    const enable =
      name?.length > 0 && price > 0 && tags?.length > 0 && !isFetching;
    return !enable;
  };

  /**
   * This component needs its own change event handel, becouse it manage inputs not controlled by value
   * @param {*} event
   */
  const enterElementHandleChange = (event) => {
    if (event.target.name === 'name') {
      setProperties({ ...properties, [event.target.name]: event.target.value });
    }
    if (event.target.name === 'sale') {
      const value = event.target.value === 'sell' ? true : false;
      setProperties({ ...properties, [event.target.name]: value });
    }
    if (event.target.name === 'price') {
      setProperties({ ...properties, [event.target.name]: event.target.value });
    }
    if (event.target.name === 'tags') {
      const { selectedOptions } = event.target;
      const tags = [...selectedOptions].map((value) => value.value);
      setProperties({ ...properties, [event.target.name]: tags });
    }
    if (event.target.name === 'photo') {
      setProperties({
        ...properties,
        [event.target.name]: event.target.files[0],
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('sale', sale);
    formData.append('price', price);
    formData.append('tags', tags);
    if (properties.photo) formData.append('photo', properties.photo);

    dispatch(newAdAction(formData));
  };

  const resetError = () => dispatch(uiResetError());

  const radioEnterValues = [
    { id: 'sell', value: 'sell', label: 'Sell' },
    { id: 'buy', value: 'buy', label: 'Buy' },
  ];

  return (
    <Page subTitle={subTitle}>
      {isFetching && <Spinner />}
      <form
        className={styles.formClass}
        id='newAdForm'
        onSubmit={handleSubmit}
      >
        <EnterElement
          labelText='Name'
          type='input'
          name='name'
          onChange={enterElementHandleChange}
          value={name || ''}
        />
        <RadioEnter
          label='Sale'
          name='sale'
          values={radioEnterValues}
          value={sale ? 'sell' : 'buy'}
          onChange={enterElementHandleChange}
        />
        <EnterElement
          labelText='Price'
          type='number'
          name='price'
          onChange={enterElementHandleChange}
          value={price || ''}
        />
        <SelectTags
          label='Tags'
          name='tags'
          value={tags || []}
          multiple
          onChange={enterElementHandleChange}
        />

        <EnterElement
          labelText='Photo'
          type='file'
          name='photo'
          onChange={enterElementHandleChange}
        />
        <Button
          type='submit'
          variant='primary'
          disabled={disableButton()}
        >
          Crear
        </Button>
      </form>
      <ErrorElement
        error={error}
        altMessage='Be sure of your data!!'
        handleErrorMessageClick={resetError}
      />
    </Page>
  );
};

const initialData = {
  name: '',
  sale: true,
  price: '',
  tags: [],
};

const EnhancedNewAdvertPage = enhancedForm(NewAdvertPage, initialData);
export default EnhancedNewAdvertPage;
