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

  const SnsLink = ({ url, img }) =>
    url ? (
      <div>
        <a href={social[url]} target="_blank" rel="noreferrer">
          <img src={img} alt={url} />
        </a>
      </div>
    ) : (
      <></>
    );

  const theme = (name: string) => (color === 'light' ? `${name}` : `${name}-dark`);

  return (
    <Layout location={location}>
      <div className="about-page">
        <h2 className={theme('about-name')}>{author.name}</h2>
        <p className={theme('self-introduction')}>{author.selfIntroduction}</p>
        <img className="profile-image" src={profile} alt="profile" />

        <div className={theme('about-mail')}>
          <img src={tag} alt="tag" className="tag-image" />
          <span>{social.mail}</span>
        </div>

        <div className="about-social">
          <SnsLink url={'git'} img={git} />
          <SnsLink url={'instagram'} img={instagram} />
          <SnsLink url={'twitter'} img={twitter} />
          <SnsLink url={'facebook'} img={facebook} />
          <SnsLink url={'linkdein'} img={linkdein} />
        </div>
      </div>
    </Layout>
  );
};

export default About;
