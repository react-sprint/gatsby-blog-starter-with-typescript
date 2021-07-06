import React from 'react';
import { Link } from 'gatsby';

import '../../styles/components/common/post-footer-card.scss';

interface Field {
  slug: string;
}
interface Frontmatter {
  title: string;
  description: string;
  date: string;
}

interface Post {
  excerpt: string;
  frontmatter: Frontmatter;
  fields: Field;
}

interface Props {
  post: Post;
  thumbnail: string | null;
}

export default function PostFooterCard({ post, thumbnail }: Props) {
  const title = post.frontmatter.title.split(' ')[0] || post.fields.slug;
  const themeSize = 3;
  const themeStartNumber = 1;

  return (
    <Link to={post.fields.slug}>
      <div className="post-footer-card">
        <div className="post-footer-card__card">
          <div className="left">
            <h2 className="title">{title}</h2>
            <p className="contents">{post.frontmatter.description || post.excerpt}</p>
          </div>
          {thumbnail ? (
            <div className="right" dangerouslySetInnerHTML={{ __html: thumbnail }} />
          ) : (
            <div
              className={`right no-thumbnail theme-color-${Math.floor(Math.random() * themeSize + themeStartNumber)}`}
            >
              <span>{title}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
