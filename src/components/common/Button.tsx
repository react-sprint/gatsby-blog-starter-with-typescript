import React from 'react';
import '../../styles/components/common/button.scss';

interface Iprops {
  text?: string;
  icon?: string;
  color?: 'green' | 'black'
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
