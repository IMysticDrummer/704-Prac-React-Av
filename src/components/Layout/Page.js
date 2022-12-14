import styled from 'styled-components';
import styles from './Page.module.css';

/**
 *
 * @param {Props} param0 Props expected:
 *   - **subTitle** title of the page rendered
 *   - children
 * @returns {React.Component}
 */
const Page = ({ subTitle, children }) => {
  return (
    <div className={styles.pageClass}>
      <h2>{subTitle}</h2>
      {children}
    </div>
  );
};

const StyledPage = styled(Page)``;

export default StyledPage;
