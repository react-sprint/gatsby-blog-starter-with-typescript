import React, { useEffect } from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import Header from '../common/Header';
import { getDefaultColorMode } from '../common/Toggler';
import './index.scss';

const Layout = ({ location, children }) => {
  const data = useStaticQuery(graphql`
    query LayoutQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  const title = data.site.siteMetadata?.title;

  let headerTitle: JSX.Element;
  const rootPath = `${__PATH_PREFIX__}/`;
  const isRootPath = location.pathname === rootPath;

  const reloadClick = () => window.location.reload();

  if (isRootPath) {
    headerTitle = (
      <div className="logo" onClick={reloadClick}>
        {title}
      </div>
    );
  } else {
    headerTitle = (
      <Link to="/" rel="noreferrer">
        {title}
      </Link>
    );
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
