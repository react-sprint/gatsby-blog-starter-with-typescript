import React, { useState } from 'react';
import { graphql } from 'gatsby';
import { parse } from 'query-string';
import { globalHistory } from '@reach/router';

import Layout from '../components/layout';
import SEO from '../components/Seo';
import Category from '../components/common/Category';
import Contacts from '../components/common/Contacts';
import Card from '../components/common/Card';
import titleIcon from '../images/title-icon.svg';

import '../styles/pages/index.scss';

const BlogIndex = ({ data, location }) => {
  const categories: string[] = ['All', ...data.allMarkdownRemark.group.map((item) => item.fieldValue)];
  const [category, setCategory] = useState<string>((parse(globalHistory.location.search)?.category as string) || 'All');
  const posts = data.allMarkdownRemark.nodes.filter((post) =>
    category === 'All' ? post : category === post.frontmatter.category,
  );

  const getThumbnail = (postIndex) => {
    const regex = /<img[^>]+src\s*=\s*['"]([^'"]+)['"][^>]*>/g;
    const htmlString = posts.map((htmlCode, htmlIndex) => {
      if (postIndex === htmlIndex) {
        return htmlCode.html;
      }
      return null;
    });
    const image = regex.exec(htmlString);
    if (image && image.length) {
      return `${image[0].split('srcset')[0]}/>`;
    }
    return null;
  };

  if (posts.length === 0) {
    return (
      <Layout location={location}>
        <SEO title="All posts" />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the directory you specified for the
          gatsby-source-filesystem plugin in gatsby-config.js).
        </p>
      </Layout>
    );
  }

  return (
    <Layout location={location}>
      <SEO title="All posts" />
      <div className="main">
        <aside className="aside main-aside">
          <Category categories={categories} category={category} setCategory={setCategory} />
          <Contacts />
        </aside>
        <div className="index">
          <h2 className="index-title">
            <img src={titleIcon} alt="title icon" />
            POSTS
          </h2>
          <div className="index-content">
            <div className="max-width-1024 card-container">
              {posts
                .filter((post) => (category === 'All' ? post : category === post.frontmatter.category))
                .map((post, postIndex) => (
                  <Card key={post.fields.slug} post={post} thumbnail={getThumbnail(postIndex)} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BlogIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      group(field: frontmatter___category) {
        fieldValue
      }
      nodes {
        excerpt
        html
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
          category
        }
      }
    }
  }
`;
