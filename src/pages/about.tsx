import React, { useEffect, useState } from 'react';
import '../styles/pages/about.scss';
import { useStaticQuery, graphql } from 'gatsby';
import Layout from '../components/layout';
import profile from '../images/about/profile.svg';
import tag from '../images/about/tag.svg';
import instagram from '../images/about/instagram.svg';
import git from '../images/about/git.svg';
import twitter from '../images/about/twitter.svg';
import facebook from '../images/about/facebook.svg';
import linkdein from '../images/about/linkdein.svg';
import { COLOR } from '../constants/togglerType';

const About = ({ location }) => {
  const [color, setColor] = useState<string>('');

  useEffect(() => {
    setColor(window.localStorage.getItem(COLOR.LOCAL_STORAGE_KEY));
  }, []);

  const data = useStaticQuery(graphql`
    query AboutQuery {
      site {
        siteMetadata {
          author {
            name
            summary
            selfIntroduction
          }
          social {
            git
            instagram
            twitter
            linkdein
            facebook
            mail
          }
        }
      }
    }
  `);

  const author = data.site.siteMetadata?.author;
  const social = data.site.siteMetadata?.social;

  return (
    <Layout location={location}>
      <div className="about-page">
        <h2 className={color === 'light' ? 'about-name' : 'about-name-dark'}>{author.name}</h2>
        <p className={color === 'light' ? 'self-introduction' : 'self-introduction-dark'}>{author.selfIntroduction}</p>

        <img className="profile-image" src={profile} alt="profile" />
        <div className={color === 'light' ? 'about-mail' : 'about-mail-dark'}>
          <img src={tag} alt="tag" className="tag-image" />
          <span>{social.mail}</span>
        </div>

        <div className="about-social">
          {social.git ? (
            <div>
              <a href={social.git} target="_blank" rel="noreferrer">
                <img src={git} alt="git" />
              </a>
            </div>
          ) : (
            <></>
          )}
          {social.instagram ? (
            <div>
              <a href={social.instagram} target="_blank" rel="noreferrer">
                <img src={instagram} alt="instagram" />
              </a>
            </div>
          ) : (
            <></>
          )}
          {social.twitter ? (
            <div>
              <a href={social.twitter} target="_blank" rel="noreferrer">
                <img src={twitter} alt="twitter" />
              </a>
            </div>
          ) : (
            <></>
          )}
          {social.facebook ? (
            <div>
              <a href={social.facebook} target="_blank" rel="noreferrer">
                <img src={facebook} alt="facebook" />
              </a>
            </div>
          ) : (
            <></>
          )}
          {social.linkdein ? (
            <div>
              <a href={social.linkdein} target="_blank" rel="noreferrer">
                <img src={linkdein} alt="linkdein" />
              </a>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default About;
