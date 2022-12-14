import styles from './FiltersAdsElement.module.css';
import EnterElement from '../common/EnterElement';
import SelectElement from '../common/SelectElement';
import Slider from '../common/Slider';
import RadioEnter from '../common/RadioEnter';

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
      <SelectElement
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
