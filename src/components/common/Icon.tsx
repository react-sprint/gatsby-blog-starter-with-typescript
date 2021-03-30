import React from 'react';

interface Iprops {
  image?: string;
}

const Icon = ({ image }: Iprops) => <img src={image} alt="icon" className="icon" />;

export default Icon;

// 카테고리 아래 아이콘 불러올 때 쓸 컴포넌트
