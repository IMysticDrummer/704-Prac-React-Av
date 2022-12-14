import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import styles from './Slider.module.css';

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ ...props }) => (
  <article className={styles.sliderContainerClass}>
    <label>
      Price Range from: {props.min} to: {props.max}
    </label>
    <Slider
      defaultValue={props.sliderRange.range}
      {...props}
    />
  </article>
);
