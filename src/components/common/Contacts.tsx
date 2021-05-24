import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import instagram from '../../images/about/instagram.svg';
import git from '../../images/about/git.svg';
import twitter from '../../images/about/twitter.svg';
import facebook from '../../images/about/facebook.svg';
import linkdein from '../../images/about/linkdein.svg';
import circle from '../../images/about/circle.svg';

import '../../styles/components/common/contacts.scss';

const Contacts = () => {
  const data = useStaticQuery(graphql`
    query ContactsQuery {
      site {
        siteMetadata {
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
  const social = data.site.siteMetadata?.social;

  const SNSLinkItem = ({ url, img }) =>
    url ? (
      <a className="snslink--item" href={social[url]} target="_blank" rel="noreferrer">
        <img src={img} alt={`${url} icon`} />
      </a>
    ) : null;

  return (
    <div className="contacts">
      <div className="mail">
        <img src={circle} alt="circle icon" className="tag-image" />
        <span>{social.mail}</span>
      </div>
      <div className="snslink">
        <SNSLinkItem url={'git'} img={git} />
        <SNSLinkItem url={'instagram'} img={instagram} />
        <SNSLinkItem url={'twitter'} img={twitter} />
        <SNSLinkItem url={'facebook'} img={facebook} />
        <SNSLinkItem url={'linkdein'} img={linkdein} />
      </div>
    </div>
  );
};

export default Contacts;
