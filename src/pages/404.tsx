import * as React from 'react';

import Layout from '../components/layout';
import SEO from '../components/Seo';

import '../styles/404.scss';

const NotFoundPage = ({ location }) => (
  <Layout location={location}>
    <SEO title="404: Not Found" />
    <h1 className="h1">404: Not Found</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
  </Layout>
);

export default NotFoundPage;
