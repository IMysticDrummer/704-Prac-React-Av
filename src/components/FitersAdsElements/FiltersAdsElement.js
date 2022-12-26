import styles from './FiltersAdsElement.module.css';
import EnterElement from '../common/EnterElement';
import Slider from '../common/Slider';
import RadioEnter from '../common/RadioEnter';
import SelectTags from '../AdvertsPage/SelectTags/SelectTags';

/**
 * Component to filtering ads.
 *
 * @param {Objects} Objects containing the configuration for each children
 * @returns {React.Component} containing the advertisement filters
 */
const FiltersAdsElement = ({
  enterConfig,
  selectConfig,
  radioConfig,
  sliderConfig,
  sliderChangeHandle,
  enterElementHandleChange,
  ...props
}) => {
  return (
    <aside className={styles.filtersContainerClass}>
      <EnterElement
        {...enterConfig}
        onChange={enterElementHandleChange}
      />
      <SelectTags
        {...selectConfig}
        onChange={enterElementHandleChange}
        handleReset={enterElementHandleChange}
      />
      <RadioEnter
        {...radioConfig}
        onChange={enterElementHandleChange}
      />

      <Slider
        {...sliderConfig}
        min={sliderConfig.sliderRange.range[0]}
        max={sliderConfig.sliderRange.range[1]}
        range={sliderConfig.sliderRange.range}
        marks={sliderConfig.sliderRange.marks}
        onChange={sliderChangeHandle}
      />
    </aside>
  );
};

export default FiltersAdsElement;
