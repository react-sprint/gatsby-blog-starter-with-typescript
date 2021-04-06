import * as React from 'react';
import { Link } from 'gatsby';
import Header from '../common/Header';

import './index.scss';

const Layout = ({ location, children }) => {
  let headerTitle: JSX.Element;
  const rootPath = `${__PATH_PREFIX__}/`;
  const isRootPath = location.pathname === rootPath;

  if (isRootPath) {
    headerTitle = <>LOGO</>;
  } else {
    headerTitle = <Link to="/">LOGO</Link>;
  }

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <Header headerTitle={headerTitle} />
      <main className="global-main">{children}</main>
    </div>
  );
};

export default Layout;
