import React from 'react';
import Layout from '../components/layout';
import '../styles/pages/about.scss';
import cat from '../images/cat.svg';
import tag from '../images/tag.svg';
import instagram from '../images/insta-green.svg';
import git from '../images/git-green.svg';
import twitter from '../images/twitter.svg';
import { Link } from '@reach/router';

const About = ({ location }) => (
  <>
    <Layout location={location}>
      <div className="about-page">
        <h2 className="about-name">박성윤</h2>
        <p className="self-introduction">
          Allow me to introduce myself. Let me introduce my self. I'd like to introduce myself.
        </p>
        <img src={cat} alt="profile" className="profile-image" />
        <div className="about-mail">
          <ul>
            <li>
              <img src={tag} alt="tag" className="tag-image" />
              <span>abcd@gmail.com</span>
            </li>
            <li>
              <img src={tag} alt="tag" className="tag-image" />
              <span>#처음</span>
            </li>
          </ul>
        </div>
        <div className="about-sns-url">
          <img src={git} alt="git" />
          <img src={instagram} alt="instagram" />
          <img src={twitter} alt="twitter" />
        </div>

        <Link to="/" className="posts-box">
          <p className="posts-text">→ POSTS</p>
        </Link>
      </div>
    </Layout>
  </>
);

export default About;
