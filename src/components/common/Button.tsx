import React from 'react';
import { ButtonColorType } from '../../constants/buttonType';
import '../../styles/components/common/button.scss';

interface ButtonProps {
  text?: string;
  icon?: string;
  color?: ButtonColorType;
}

const Button = ({ text, color, icon }: ButtonProps) => (
  <button className={color}>
    {text}
    <img src={icon} alt={`${icon}-icon`} />
  </button>
);
export default Button;

Button.defaultProps = {
  color: 'green',
};
