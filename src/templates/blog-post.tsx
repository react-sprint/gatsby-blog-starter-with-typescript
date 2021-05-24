import * as React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../components/layout';
import arrowIcon from '../images/arrow.svg';
import SEO from '../components/Seo';
import prevIcon from '../images/post-prev-icon.svg';
import nextIcon from '../images/post-next-icon.svg';
import '../styles/blog-post.scss';
import '../styles/code.scss';
import PostFooterCard from '../components/common/PostFooterCard';
import Comment from '../components/comment';

export interface CommentProps {
  service: 'disqus' | 'utterances';
  disqusProps: {
    shortname: string;
    config: { identifier: string; title: string };
  };
  utterancesProps: string;
}

const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark;
  const posts = data.allMarkdownRemark.nodes;
  const slug = data.markdownRemark.fields?.slug;
  const { category } = data.markdownRemark.frontmatter;
  const { commentInfo } = data.site.siteMetadata;

  const { previous, next } = data;

  const filteredPost = posts.filter((item) => category === item.frontmatter.category);

  const commentProps: CommentProps = {
    service: commentInfo.service,
    disqusProps: {
      shortname: commentInfo.disqusId,
      config: { identifier: slug, title: post.frontmatter.title },
    },
    utterancesProps: commentInfo.utterancesId,
  };

  const getThumbnail = (postIndex) => {
    const regex = /<img[^>]+src\s*=\s*['"]([^'"]+)['"][^>]*>/g;
    const htmlString = filteredPost.map((htmlCode, htmlIndex) => {
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

  return (
    <Layout location={location}>
      <SEO title={post.frontmatter.title} description={post.frontmatter.description || post.excerpt} />
      <article className="blog-post" itemScope itemType="http://schema.org/Article">
        <header>
          <p className="post-category">
            <Link to={`/`}>HOME</Link>
            <img src={arrowIcon} alt="HOME" />
            <Link to={`/?category=${category}`}>{category}</Link>
          </p>
          <h1 itemProp="headline">{post.frontmatter.title}</h1>
          <p>{post.frontmatter.date}</p>
        </header>
        <section dangerouslySetInnerHTML={{ __html: post.html }} itemProp="articleBody" />
      </article>
      <nav className="blog-post-nav">
        <ul>
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                <img src={prevIcon} alt="left" className="left" /> PREV
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                RIGHT <img src={nextIcon} alt="right" className="right" />
              </Link>
            )}
          </li>
        </ul>
        <p className="post-category">
          <Link to={`/`}>HOME</Link>
          <img src={arrowIcon} alt="HOME" />
          <Link to={`/?category=${category}`}>{category}</Link>
        </p>
        <div className="post-card-container">
          {filteredPost.map((item, postIndex) => (
            <PostFooterCard key={item.fields.slug} post={item} thumbnail={getThumbnail(postIndex)} />
          ))}
        </div>
      </nav>
      <Comment
        service={commentProps.service}
        disqusProps={commentProps.disqusProps}
        utterancesProps={commentProps.utterancesProps}
      />
    </Layout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($id: String!, $previousPostId: String, $nextPostId: String) {
    site {
      siteMetadata {
        title
        commentInfo {
          service
          disqusId
          utterancesId
        }
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        category
      }
      fields {
        slug
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
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
