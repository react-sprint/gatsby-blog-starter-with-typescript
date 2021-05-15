import React from 'react';
import '../../styles/components/common/header.scss';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { BUTTON_COLOR } from '../../constants/buttonType';
import Git from '../../images/about/git.svg';
import Button from './Button';

interface HeaderProps {
  headerTitle: JSX.Element;
}

function Header({ headerTitle }: HeaderProps) {
  const data = useStaticQuery(graphql`
    query gitUrlQuery {
      site {
        siteMetadata {
          social {
            git
          }
        }
      }
    }
  `);

  const gitUrl = data.site.siteMetadata.social?.git;

  return (
    <header className="header-area">
      <div className="header-contents">
        <h2 className="header-title">{headerTitle}</h2>
        <div className="header-category-container">
          <Link to="/">
            <h3>POSTS</h3>
          </Link>
          <Link to="/about">
            <h3>ABOUT</h3>
          </Link>
          <Button
            text="GITHUB"
            color={BUTTON_COLOR.GREEN}
            icon={Git}
            handleClick={() => {
              if (typeof window === 'undefined') return;
              window.open(`${gitUrl}`);
            }}
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
