import React from 'react';
import { Link } from 'gatsby';

import viewIcon from '../../images/card-view-icon.svg';
import likedIcon from '../../images/card-liked-icon.svg';
import '../../styles/components/common/card.scss';

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
}

export default function Card({ post }: Props) {
  const title = post.frontmatter.title || post.fields.slug;
  return (
    <Link to={post.fields.slug}>
      <div className="card">
        <div className="card--image" />
        <div className="card--desc">
          <div className="card--desc__top">
            <h2 className="title">{title}</h2>
            <p className="contents">{post.frontmatter.description || post.excerpt}</p>
            <p className="date">{post.frontmatter.date}</p>
          </div>
          <div className="card--desc__bottom">
            <p className="card-view">
              <img src={viewIcon} alt="view icon" className="card-view-icon" />
              <span className="card-view-text">4 view</span>
            </p>
            <p className="card-liked">
              <img src={likedIcon} alt="liked icon" className="card-liked-icon" />
              <span className="card-liked-text">12 liked</span>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
