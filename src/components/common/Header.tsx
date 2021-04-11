import React from 'react';
import '../../styles/components/common/header.scss';
import { Link } from 'gatsby';
import { BUTTON_COLOR } from '../../constants/buttonType';
import Git from '../../images/git.svg';
import { githubURl } from '../../constants/userData';
import Button from './Button';

interface HeaderProps {
  headerTitle: JSX.Element;
}

function Header({ headerTitle }: HeaderProps) {
  return (
    <header className="header-area">
      <div className="header-contents">
        <h2 className="header-title">{headerTitle}</h2>
        <div className="header-category-container">
          <Link to="/">
            <h3>POSTS</h3>
          </Link>
          <Link to="/">
            <h3>ABOUT</h3>
          </Link>
          <Button
            text="GITHUB"
            color={BUTTON_COLOR.GREEN}
            icon={Git}
            handleClick={() => {
              window.open(`${githubURl}`);
            }}
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
