import React from 'react';
import '../styles/pages/about.scss';
import Layout from '../components/layout';
import profile from '../images/profile.svg';
import tag from '../images/tag.svg';
import instagram from '../images/insta-green.svg';
import git from '../images/git-green.svg';
import twitter from '../images/twitter.svg';
import { Link } from '@reach/router';
import { useStaticQuery, graphql } from 'gatsby';

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
            linkdein
            mail
          }
        }
      }
    }
  `);

  const author = data.site.siteMetadata?.author;
  const social = data.site.siteMetadata?.social;

  return (
    <>
      <Layout location={location}>
        <div className="about-page">
          <h2 className="about-name">{author.name}</h2>
          <p className="self-introduction">{author.summary}</p>

          <img className="profile-image" src={profile} alt="profile" />
          <div className="about-mail">
            <img src={tag} alt="tag" className="tag-image" />
            <span>{social.mail}</span>
          </div>

          <div className="about-social">
            {social.git ? <img src={git} alt="git" onClick={() => window.open(`${social.git}`)} /> : <></>}
            {social.instagram ? (
              <img src={instagram} alt="instagram" onClick={() => window.open(`${social.instagram}`)} />
            ) : (
              <></>
            )}
            {social.twitter ? (
              <img src={twitter} alt="twitter" onClick={() => window.open(`${social.twitter}`)} />
            ) : (
              <></>
            )}
          </div>

          <Link to="/" className="posts-box">
            <p className="posts-text">→ POSTS</p>
          </Link>
        </div>
      </Layout>
    </>
  );
};

export default About;
