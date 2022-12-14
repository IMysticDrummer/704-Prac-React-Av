import Header from './Header.js';
import classNames from 'classnames';

import styles from './Layout.module.css';
import { Outlet } from 'react-router-dom';

/**
 *
 * @param {Props} param0 Expected props:
 *   - **title** of the app/site
 *   - *className* (optional)
 *   - **children** of the layout
 *   - other props
 * @returns
 */
const Layout = ({ title, children, className, ...props }) => {
  return (
    <main className={classNames(styles.layoutMainClass, className)}>
      <Header title={title}></Header>
      <Outlet />
      <footer>@ 2022 Iván García & Keepcoding</footer>
    </main>
  );
};

export default Layout;
