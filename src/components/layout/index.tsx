import * as React from 'react';
import { Link } from '@reach/router';
import Header from '../common/Header';

import './index.scss';

const Layout = ({ location, children }) => {
  let headerTitle: JSX.Element;
  const rootPath = `${__PATH_PREFIX__}/`;
  const isRootPath = location.pathname === rootPath;

  if (isRootPath) {
    headerTitle = <div onClick={() => window.location.reload()}>LOGO</div>;
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
