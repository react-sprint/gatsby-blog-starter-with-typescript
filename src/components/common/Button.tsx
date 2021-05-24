import React from 'react';
import { ButtonColorType } from '../../constants/buttonType';
import '../../styles/components/common/button.scss';

interface ButtonProps {
  text?: string;
  icon?: string;
  color?: ButtonColorType;
  handleClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Button = ({ text, color, icon, handleClick }: ButtonProps) => (
  <button className={color} onClick={handleClick}>
    {text}
    <img src={icon} alt={`${icon}-icon`} />
  </button>
);
export default Button;

Button.defaultProps = {
  color: 'green',
};
