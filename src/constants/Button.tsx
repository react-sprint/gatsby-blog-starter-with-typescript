import React from 'react';
import '../styles/constants/button.scss';

interface Iprops {
  text?: string;
  icon?: string;
  color: string; // default로 green과 black이 있음
}

const Button = ({ text, color, icon }: Iprops) => (
  <button className={color}>
    {text}
    <img src={icon} />
  </button>
);
export default Button;
