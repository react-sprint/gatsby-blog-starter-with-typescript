import React from 'react';
import { Link } from 'gatsby';

import viewIcon from '../../images/card-view-icon.svg';
import likedIcon from '../../images/card-liked-icon.svg';
import '../../styles/components/card.scss';

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

// 기존 소스 참고용
{
  /* <li key={post.fields.slug}>
  <article className="post-list-item" itemScope itemType="http://schema.org/Article">
    <header>
      <h2>
        <Link to={post.fields.slug} itemProp="url">
          <span itemProp="headline">{title}</span>
        </Link>
      </h2>
      <small>{post.frontmatter.date}</small>
    </header>
    <section>
      <p
        dangerouslySetInnerHTML={{
          __html: post.frontmatter.description || post.excerpt,
        }}
        itemProp="description"
      />
    </section>
  </article>
  <Sample />
</li> */
}
