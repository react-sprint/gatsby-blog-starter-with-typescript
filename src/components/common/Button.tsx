import React from 'react';
import '../../styles/components/common/button.scss';

interface Iprops {
  props: string;
}

const Button = ({ props }: Iprops) => <button className="button">{props}</button>;

export default Button;
