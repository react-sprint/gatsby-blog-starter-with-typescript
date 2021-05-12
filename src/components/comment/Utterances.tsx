import React, { createRef, useEffect } from 'react';
import { COLOR } from '../../constants/togglerType';

interface UtterancesProps {
  repo: string;
}

const src = 'https://utteranc.es/client.js';
const DARK_THEME = 'github-dark';
const LIGHT_THEME = 'github-light';

const Utterances = React.memo(({ repo }: UtterancesProps) => {
  const commentRef = createRef<HTMLDivElement>();

  useEffect(() => {
    const utterances = document.createElement('script');
    const bodyDOM = document.querySelector('body');
    const isDarkMode = bodyDOM.classList.contains(COLOR.DARK_MODE);

    const utterancesConfig = {
      src,
      repo,
      theme: isDarkMode ? DARK_THEME : LIGHT_THEME,
      label: '💬 comment',
      async: 'true',
      'issue-term': 'pathname',
      crossOrigin: 'anonymous',
    };

    Object.entries(utterancesConfig).forEach(([key, value]) => {
      utterances.setAttribute(key, value);
    });

    commentRef.current.appendChild(utterances);
  }, []);

  return <div ref={commentRef} />;
});

Utterances.displayName = 'Utterances';

export default Utterances;
