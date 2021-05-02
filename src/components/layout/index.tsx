import * as React from 'react';
import { Link } from '@reach/router';
import Header from '../common/Header';
import { useStaticQuery, graphql } from 'gatsby';
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

  if (isRootPath) {
    headerTitle = (
      <div className="logo" onClick={() => window.location.reload()}>
        {title}
      </div>
    );
  } else {
    headerTitle = <Link to="/">{title}</Link>;
  }

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <Header headerTitle={headerTitle} />
      <main className="global-main">{children}</main>
    </div>
  );
};

export default Layout;
