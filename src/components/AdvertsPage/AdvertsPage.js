import { useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from './AdvertsPage.module.css';
import { Link, useNavigate } from 'react-router-dom';
import Page from '../Layout/Page';
import FiltersAdsElement from '../FitersAdsElements/FiltersAdsElement';
import {
  enterFilterConfObject,
  selectFilterConfObject,
  radioFilterConfObject,
  sliderFilterConfObject,
} from '../FitersAdsElements/filtersConf';
import {
  filterNameFunction,
  filterTagsFunction,
  filterSellFunction,
  filterPriceFunction,
  calculateSliderRange,
} from '../FitersAdsElements/filtersFunctions';

import { Button } from '../common/Button';
import Spinner from '../common/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { getAds, getUi } from '../../store/selectors';
import { getAdsAction } from '../../store/actions';

/**
 * Advertisement component.
 * Recives the title and subTitle of the page.
 * Recives if the user is logged.
 * Recives a function to manage the onLogout event
 * @param {title:string, subTitle:string, className:string} param0
 * @returns React.Component
 */
const AdvertsPage = ({ title, subTitle, className }) => {
  const [filters, setFilters] = useState({ sellFilter: '', tags: [] });
  const dispatch = useDispatch();

  const advertisements = useSelector(getAds);
  const { isLoading: isFetching } = useSelector(getUi);

  const Navigate = useNavigate();

  useEffect(() => {
    dispatch(getAdsAction());
  }, [dispatch]);

  const sectionClassName = classNames(className, styles.AdvertsPageCommon, {
    [styles.empty]: !advertisements,
    [styles.AdvertsPageDefault]: !className,
  });

  /**
   * Filters the recived advertisements array and returns it filtered by name, tags, sell and price, selected in the filters bar
   * @returns {Array} Filtered Advertisement List
   */
  const filterAds = () => {
    if (!advertisements) return null;
    return advertisements
      .filter((ad) => filterNameFunction(ad, filters))
      .filter((ad) => filterTagsFunction(ad, filters))
      .filter((ad) => filterSellFunction(ad, filters))
      .filter((ad) => filterPriceFunction(ad, filters));
  };

  const filteredAds = filterAds(advertisements);

  const sliderChangeHandle = (event) => {
    setFilters({ ...filters, price: event });
  };

  const redirectNewAd = () => {
    Navigate('new');
  };

  const rangeOfSlider = advertisements
    ? calculateSliderRange(advertisements)
    : null;

  /**
   * Handle events recived from the FiltesAdsElement
   * @param {Event} event
   */
  const enterElementHandleChange = (event) => {
    if (event.target.name === 'name' || event.target.name === 'sellFilter') {
      setFilters({ ...filters, [event.target.name]: event.target.value });
    }

    if (event.target.name === 'tags') {
      const { selectedOptions } = event.target;
      const newTags = [...selectedOptions].map((value) => value.value);
      setFilters({ ...filters, [event.target.name]: newTags });
    }
    if (event.target.name === 'reset') {
      setFilters({ ...filters, tags: [] });
    }
  };

  return (
    <Page subTitle={subTitle}>
      {isFetching && <Spinner />}
      {advertisements?.length > 0 && (
        <FiltersAdsElement
          enterElementHandleChange={enterElementHandleChange}
          enterConfig={{ ...enterFilterConfObject, value: filters.name }}
          selectConfig={{
            ...selectFilterConfObject,
            value: filters.tags,
          }}
          radioConfig={{ ...radioFilterConfObject, value: filters.sellFilter }}
          sliderConfig={{
            ...sliderFilterConfObject,
            sliderRange: rangeOfSlider,

            value: filters.price,
          }}
          sliderChangeHandle={sliderChangeHandle}
        />
      )}
      <section className={sectionClassName}>
        <ul>
          {filteredAds?.length
            ? filteredAds.map((ad) => (
                <Link
                  className={styles.linkClass}
                  key={ad.id}
                  to={`/adverts/${ad.id}`}
                >
                  <li>
                    <p
                      className={classNames(styles.adSale, {
                        [styles.sell]: ad.sale,
                        [styles.buy]: !ad.sale,
                      })}
                    >
                      {ad.sale ? 'Sell' : 'Buy'}
                    </p>
                    <p className={styles.product}>{ad.name}</p>
                    <p className={styles.priceAndTags}>
                      <span>Price: {ad.price}</span>
                      <span>Tags: {ad.tags.join(' - ')}</span>
                    </p>
                  </li>
                </Link>
              ))
            : !isFetching && (
                <Button
                  variant='primary'
                  onClick={redirectNewAd}
                >
                  Crea tu primer anuncio
                </Button>
              )}
        </ul>
      </section>
    </Page>
  );
};

export default AdvertsPage;
