import Git from '../images/git.svg';
import { githubURl } from './userData';

export const githubBtnProps = {
  text: 'GITHUB',
  color: 'green',
  icon: Git,
  handleClick: () => {
    window.location.href = `${githubURl}`;
  },
};
