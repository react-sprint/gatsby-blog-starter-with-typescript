import React from 'react';
import Badge from './Badge';

import '../../styles/components/common/category.scss';

interface ICategory {
  categories: string[];
  category: string;
  setCategory: (id: string) => void;
}

export default function Category({ categories, category, setCategory }: ICategory) {
  return (
    <div className="category">
      {categories.map((categotyItem) => (
        <Badge key={categotyItem} id={categotyItem} isActive={categotyItem === category} onClick={setCategory}>
          {categotyItem}
        </Badge>
      ))}
    </div>
  );
}
