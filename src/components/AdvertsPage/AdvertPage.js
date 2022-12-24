import { Fragment, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '../common/Button.js';
import ConfirmElement from '../common/ConfirmElement.js';
import ErrorElement from '../common/ErrorElement.js';
import Page from '../Layout/Page.js';
import styles from './AdvertPage.module.css';
import classNames from 'classnames';
import Spinner from '../common/Spinner.js';
import { useDispatch, useSelector } from 'react-redux';
import { getAdById, getUi } from '../../store/selectors.js';
import {
  adByIdEraseAction,
  adByIdEraseCancel,
  adByIdEraseRequest,
  adByIdLoadAction,
  uiResetError,
} from '../../store/actions.js';

const AdvertPage = ({ subTitle }) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { isLoading: isFetching, isErasing: erase, error } = useSelector(getUi);

  const advertisement = useSelector(getAdById(id));

  useEffect(() => {
    dispatch(adByIdLoadAction(id));
  }, [dispatch, id]);

  const resetError = () => dispatch(uiResetError());

  const handleEraseAdClick = (event) => {
    event.preventDefault();

    dispatch(adByIdEraseRequest());
  };

  const eraseAdResponse = async (eraseResponse) => {
    if (eraseResponse) {
      dispatch(adByIdEraseAction(id));
    } else {
      dispatch(adByIdEraseCancel());
    }
  };

  return (
    <Page subTitle={subTitle}>
      <section className={styles.adContainerClass}>
        {isFetching && <Spinner />}
        {error && (
          <ErrorElement
            error={error}
            altMessage="Something's wrong retrieving data from server"
            handleErrorMessageClick={resetError}
          />
        )}
        {erase && (
          <ConfirmElement
            message="You're about to erase this advertisement"
            response={eraseAdResponse}
          />
        )}
        {advertisement && (
          <Fragment>
            <p
              className={classNames(styles.sellParagraph, {
                [styles.sell]: advertisement.sale,
                [styles.buy]: !advertisement.sale,
              })}
            >
              {advertisement.sale ? 'Sell' : 'Buy'}
            </p>
            <p className={styles.product}>{advertisement.name}</p>
            <p className={styles.price}>$ {advertisement.price}</p>
            <div className={styles.imgContainer}>
              {!advertisement.photo ? (
                <label>NO PHOTO AVIABLE</label>
              ) : (
                <img
                  src={advertisement.photo || ''}
                  alt={advertisement.name}
                />
              )}
            </div>
            <p className={styles.tags}>{advertisement.tags.join(' - ')}</p>
            <p className={styles.created}>
              Created:{' '}
              <time className={styles.date}>
                {new Date(advertisement.createdAt).getFullYear()}-
                {new Date(advertisement.createdAt).getMonth() + 1}-
                {new Date(advertisement.createdAt).getDate()}
              </time>
            </p>
            <Button
              name='eraseAd'
              onClick={handleEraseAdClick}
            >
              Erase Advertisement
            </Button>
            <p>Id: {advertisement.id}</p>
          </Fragment>
        )}
      </section>
    </Page>
  );
};

export default AdvertPage;
