import React, { useEffect } from 'react';
import { Link } from 'gatsby';
import Header from '../common/Header';
import { getDefaultColorMode } from '../common/Toggler';
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

  useEffect(() => {
    const defaultColorMode = getDefaultColorMode();
    document.body.classList.add(defaultColorMode);
  }, []);

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <Header headerTitle={headerTitle} />
      <main className="global-main">{children}</main>
    </div>
  );
};

export default Layout;
