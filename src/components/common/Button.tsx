import React from 'react';
import '../../styles/components/common/button.scss';

interface Iprops {
  text?: string;
  icon?: string;
  color?: string; // default로 green과 black이 있음
  handleClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Button = ({ text, color, icon, handleClick }: Iprops) => (
  <button className={color} onClick={handleClick}>
    {text}
    <img src={icon} />
  </button>
);
export default Button;

Button.defaultProps = {
  color: 'green',
};
