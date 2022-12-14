import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../common/Button.js';
import EnterElement from '../common/EnterElement.js';
import ErrorElement from '../common/ErrorElement.js';
import RadioEnter from '../common/RadioEnter.js';
import SelectElement from '../common/SelectElement.js';
import Page from '../Layout/Page.js';
import { useOptions } from './optionsContex.js';
import { postNewAd } from './service.js';
import styles from './NewAdvertPage.module.css';
import Spinner from '../common/Spinner.js';

const NewAdvertPage = ({ subTitle }) => {
  const [form, setForm] = useState({
    name: '',
    sale: true,
    price: '',
    tags: [],
  });
  const [error, setError] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const navigate = useNavigate();
  const { tagOptions } = useOptions();

  const disableButton = () => {
    const enable =
      form?.name?.length > 0 &&
      form?.price > 0 &&
      form?.tags?.length > 0 &&
      !isFetching;
    return !enable;
  };

  const enterElementHandleChange = (event) => {
    if (event.target.name === 'name') {
      setForm({ ...form, [event.target.name]: event.target.value });
    }
    if (event.target.name === 'sale') {
      const value = event.target.value === 'sell' ? true : false;
      setForm({ ...form, [event.target.name]: value });
    }
    if (event.target.name === 'price') {
      setForm({ ...form, [event.target.name]: event.target.value });
    }
    if (event.target.name === 'tags') {
      const { selectedOptions } = event.target;
      const tags = [...selectedOptions].map((value) => value.value);
      setForm({ ...form, [event.target.name]: tags });
    }
    if (event.target.name === 'photo') {
      setForm({ ...form, [event.target.name]: event.target.files[0] });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('sale', form.sale);
    formData.append('price', form.price);
    formData.append('tags', form.tags);
    if (form.photo) formData.append('photo', form.photo);

    try {
      setError(null);
      setIsFetching(true);
      const response = await postNewAd(formData);
      const to = `/adverts/${response.id}`;
      navigate(to, { replace: true });
    } catch (error) {
      setError(error);
    }
    setIsFetching(false);
  };

  const resetError = () => setError(false);

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
          value={form?.name || ''}
        />
        <RadioEnter
          label='Sale'
          name='sale'
          values={radioEnterValues}
          value={form?.sale ? 'sell' : 'buy'}
          onChange={enterElementHandleChange}
        />
        <EnterElement
          labelText='Price'
          type='number'
          name='price'
          onChange={enterElementHandleChange}
          value={form?.price || ''}
        />
        <SelectElement
          label='Tags'
          name='tags'
          value={form?.tags || []}
          options={tagOptions}
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

export default NewAdvertPage;
