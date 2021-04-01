import * as React from 'react';
import { Link } from 'gatsby';

import './index.scss';
import Button from '../../constants/Button';
import Git from '../../images/git.svg';

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
      <header className="global-header">
        <Button text="GITHUB" color="green" icon={Git} />
      </header>
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
