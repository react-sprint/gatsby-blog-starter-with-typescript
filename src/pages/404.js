<<<<<<< HEAD
import * as React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
=======
import * as React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout/index";
import SEO from "../components/seo";

import "../styles/404.scss";
>>>>>>> 532bf4cc067f9a9cc42b7c3082e50bfc7bfde0b5

const NotFoundPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="404: Not Found" />
      <h1 className="h1">404: Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Layout>
  );
};

export default NotFoundPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
