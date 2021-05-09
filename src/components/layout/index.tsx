import * as React from 'react';
import { Link } from '@reach/router';
import { useStaticQuery, graphql } from 'gatsby';
import Header from '../common/Header';
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

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <Header headerTitle={headerTitle} />
      <main className="global-main">{children}</main>
    </div>
  );
};

export default Layout;
