import React from 'react';
import { Link } from 'gatsby';

import cardTagIcon from '../../images/card-tag-icon.svg';
import cardDateIcon from '../../images/card-date-icon.svg';
import '../../styles/components/common/card.scss';

interface Field {
  slug: string;
}
interface Frontmatter {
  title: string;
  description: string;
  date: string;
  category: string;
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

export default function Card({ post, thumbnail }: Props) {
  const title = post.frontmatter.title || post.fields.slug;
  const { category, description } = post.frontmatter;

  const themeSize = 3;
  const themeStartNumber = 1;

  return (
    <Link to={post.fields.slug}>
      <div className="card">
        {thumbnail ? (
          <div className="card--image" dangerouslySetInnerHTML={{ __html: thumbnail }} />
        ) : (
          <div
            className={`card--image no-thumbnail theme-color-${Math.floor(
              Math.random() * themeSize + themeStartNumber,
            )}`}
          >
            <span>{title}</span>
          </div>
        )}
        <div className="card--desc">
          <div className="card--desc__top">
            <h2 className="title">{title}</h2>
            <p className="contents">{description || post.excerpt}</p>
          </div>
          <div className="card--desc__bottom">
            <p className="card-category">
              <img src={cardTagIcon} alt="category icon" className="card-category-icon" />
              <span className="card-category-text">{category}</span>
            </p>
            <p className="card-date">
              <img src={cardDateIcon} alt="date icon" className="card-date-icon" />
              <span className="card-date-text">{post.frontmatter.date}</span>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
