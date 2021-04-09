import { useEffect, useState, useCallback } from 'react';
import qs from 'query-string';

const useCategory = () => {
  const getCategory: string = (qs.parse(window.location.search)?.category as string) || 'All';
  const [category, setCategory] = useState<string>(getCategory);

  const selectCategory = useCallback((_category) => {
    setCategory(_category);
    window.history.pushState({ _category }, 'category', `?category=${_category}`);
  }, []);

  const changeCategory = useCallback(() => {
    const target = qs.parse(window.location.search)?.category as string;
    setCategory(target);
  }, []);

  useEffect(() => {
    window.addEventListener('popstate', changeCategory);
    return () => {
      window.removeEventListener('popstate', changeCategory);
    };
  }, []);

  return [category, selectCategory];
};

export default useCategory;
