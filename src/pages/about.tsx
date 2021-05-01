import React, { useState } from 'react';
import '../styles/pages/about.scss';
import Layout from '../components/layout';
import tag from '../images/tag.svg';
import instagram from '../images/insta-green.svg';
import git from '../images/git-green.svg';
import twitter from '../images/twitter.svg';
import { Link } from '@reach/router';
import { graphql, useStaticQuery } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import Loading from '../components/common/Loading';

const About = ({ location }) => {
  const data = useStaticQuery(graphql`
    query AboutQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            git
            instagram
            twitter
            mail
          }
        }
      }
    }
  `);

  const author = data.site.siteMetadata?.author;
  const social = data.site.siteMetadata?.social;
  const [loading, setLoading] = useState(false);

  if (loading)
    return (
      <>
        <Layout location={location}>
          <div className="about-page">
            <h2 className="about-name">{author.name}</h2>
            <p className="self-introduction">{author.summary}</p>
            <StaticImage
              className="profile-image"
              layout="fixed"
              formats={['png', 'png', 'png']}
              src={'../images/profile.svg'}
              width={216}
              height={216}
              quality={95}
              alt="profile"
            />

            <div className="about-tag">
              <div>
                <img src={tag} alt="tag" className="tag-image" />
                <span>{social.mail}</span>
              </div>

              <div>
                <img src={tag} alt="tag" className="tag-image" />
                <span>#처음</span>
              </div>
            </div>

            <div className="about-social">
              <img src={git} alt="git" onClick={() => window.open(`${social.git}`)} />
              <img src={instagram} alt="instagram" onClick={() => window.open(`${social.instagram}`)} />
              <img src={twitter} alt="twitter" onClick={() => window.open(`${social.twitter}`)} />
            </div>

            <Link to="/" className="posts-box">
              <p className="posts-text">→ POSTS</p>
            </Link>
          </div>
        </Layout>
      </>
    );
  else {
    <Loading />;
  }
};

export default About;
