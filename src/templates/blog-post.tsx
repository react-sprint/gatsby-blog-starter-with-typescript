import * as React from 'react';
import { Link, graphql } from 'gatsby';

import Bio from '../components/Bio';
import Layout from '../components/layout';
import arrowIcon from '../images/arrow.svg';
import SEO from '../components/Seo';
import '../styles/blog-post.scss';
import '../styles/code.scss';
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
  const siteTitle = data.site.siteMetadata?.title || `Title`;
  const slug = data.markdownRemark.fields?.slug;
  const { commentInfo } = data.site.siteMetadata;
  const { previous, next } = data;

  const commentProps: CommentProps = {
    service: commentInfo.service,
    disqusProps: {
      shortname: commentInfo.disqusId,
      config: { identifier: slug, title: post.frontmatter.title },
    },
    utterancesProps: commentInfo.utterancesId,
  };

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={post.frontmatter.title} description={post.frontmatter.description || post.excerpt} />
      <article className="blog-post" itemScope itemType="http://schema.org/Article">
        <header>
          <p className="category">
            <span>HOME</span> <img src={arrowIcon} /> <span>카테고리명</span>
          </p>
          <h1 itemProp="headline">{post.frontmatter.title}</h1>
          <p>SubTitle {post.frontmatter.date}</p>
        </header>
        <section dangerouslySetInnerHTML={{ __html: post.html }} itemProp="articleBody" />
        <hr />
        <footer>
          <Bio />
        </footer>
      </article>
      <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
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
  }
`;
