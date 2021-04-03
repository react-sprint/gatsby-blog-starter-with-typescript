import { useEffect, useState } from 'react';
import qs from 'query-string';

const useCategory = () => {
  const getCategory: string = (qs.parse(window.location.search)?.category as string) || 'All';
  const [category, setCategory] = useState<string>(getCategory);

  useEffect(() => {
    window.history.pushState({ category }, 'category', `?category=${category}`);
  }, [category]);

  return [category, setCategory];
};

export default useCategory;
