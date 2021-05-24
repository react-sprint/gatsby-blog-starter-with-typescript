import React from 'react';
import { Link } from '@reach/router';
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
        <Link
          key={`badge-${categotyItem}`}
          to={`/?category=${categotyItem}`}
          className={`category--item ${categotyItem === category ? 'active' : ''}`}
          onClick={() => setCategory(categotyItem)}
        >
          {categotyItem}
        </Link>
      ))}
    </div>
  );
}
