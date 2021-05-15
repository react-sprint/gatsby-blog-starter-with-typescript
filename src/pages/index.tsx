import React, { useState } from 'react';
import { graphql } from 'gatsby';
import { parse } from 'query-string';
import { globalHistory } from '@reach/router';

import Layout from '../components/layout';
import SEO from '../components/Seo';
import Category from '../components/common/Category';
import Card from '../components/common/Card';
import Toggler from '../components/common/Toggler';
import titleIcon from '../images/title-icon.svg';
import tagIcon from '../images/tag-icon.svg';

import '../styles/pages/index.scss';

const BlogIndex = ({ data, location }) => {
  const posts = data.allMarkdownRemark.nodes;
  const categories: string[] = ['All', ...data.allMarkdownRemark.group.map((item) => item.fieldValue)];
  const [category, setCategory] = useState<string>((parse(globalHistory.location.search)?.category as string) || 'All');

  const getThumbnail = (postIndex) => {
    const regex = /<img[^>]+src\s*=\s*['"]([^'"]+)['"][^>]*>/g;
    const htmlString = data.allMarkdownRemark.nodes.map((htmlCode, htmlIndex) => {
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
          <Toggler />
          <div className="aside-header">
            <div className="aside-tag-container">
              <img src={tagIcon} alt="tag" className="aside-tag-img" />
              <h2 className="aside-tag-title">TAG</h2>
            </div>
          </div>

          <Category categories={categories} category={category} setCategory={setCategory} />
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
