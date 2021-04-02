import React, { ReactChild } from 'react';
import '../../styles/components/badge.scss';

export interface IBadge {
  id: string;
  isActive?: boolean;
  children?: ReactChild;
  onClick?: (id: string) => void;
}

export default function Badge({ id, children, isActive, onClick }: IBadge) {
  return (
    <button
      id={`badge-${id}`}
      type="button"
      className={`badge ${isActive ? 'active' : ''}`}
      onClick={() => onClick(id)}
    >
      {children}
    </button>
  );
}

Badge.defaultProps = {
  onClick: () => {},
};
