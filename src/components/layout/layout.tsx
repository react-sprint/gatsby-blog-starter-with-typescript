import * as React from 'react';
import { Link } from 'gatsby';

import './layout.scss';

const Layout = ({ location, title, children }) => {
  let header;
  const rootPath = `${__PATH_PREFIX__}/`;
  const isRootPath = location.pathname === rootPath;

  if (isRootPath) {
    header = (
      <h1 className="main-heading">
        <Link to="/">{title}</Link>
      </h1>
    );
  } else {
    header = (
      <Link className="header-link-home" to="/">
        {title}
      </Link>
    );
  }

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      {/* <header className="global-header">{header}</header> */}
      <header className="global-header">header</header>
      {isRootPath && (
        <aside className="global-aside">
          <h3>우측 카테고리 탭</h3>
        </aside>
      )}
      <main className="global-main">{children}</main>
      {/* <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </footer> */}
    </div>
  );
};

export default Layout;
