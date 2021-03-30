import React from 'react';
import '../../styles/components/button.scss';

interface Iprops {
  props: string;
}

const Button = ({ props }: Iprops) => (
  <button className="button">
    <p>{props}</p>
  </button>
);

export default Button;
