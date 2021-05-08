import React, { useState, useEffect } from 'react';
import '../../styles/components/common/toggler.scss';
import { Color, COLOR } from '../../constants/togglerType';

export const getDefaultColorMode = (): Color => {
  if (typeof window !== 'undefined') {
    const defaultColorMode = window.localStorage.getItem(COLOR.LOCAL_STORAGE_KEY);

    if (typeof defaultColorMode === 'string') {
      return defaultColorMode as Color;
    }

    const defaultMediaQuery = window.matchMedia(COLOR.MEDIA_KEY);

    if (typeof defaultMediaQuery.matches === 'boolean')
      return defaultMediaQuery.matches ? COLOR.DARK_MODE : COLOR.LIGHT_MODE;
  }

  return COLOR.LIGHT_MODE;
};

const Toggler = () => {
  const [colorMode, setColorMode] = useState<Color>(getDefaultColorMode);

  const toggleColorHandler = () => {
    const toggledColor = colorMode === COLOR.DARK_MODE ? COLOR.LIGHT_MODE : COLOR.DARK_MODE;

    document.body.classList.toggle(COLOR.LIGHT_MODE);
    document.body.classList.toggle(COLOR.DARK_MODE);

    if (typeof window !== 'undefined') {
      window.localStorage.setItem(COLOR.LOCAL_STORAGE_KEY, toggledColor);
    }

    setColorMode(toggledColor);
  };

  useEffect(() => {
    colorMode === COLOR.DARK_MODE
      ? document.body.classList.add(COLOR.DARK_MODE)
      : document.body.classList.add(COLOR.LIGHT_MODE);
  }, [colorMode]);

  return (
    <label className="toggler">
      <input
        type="checkbox"
        className="toggler-checkbox"
        onChange={toggleColorHandler}
        checked={colorMode === COLOR.DARK_MODE}
      />
      <span className={`toggler-slider toggler-slider-${colorMode}`} />
      <span className={`toggler-text toggler-text-${colorMode}`}>{colorMode}</span>
    </label>
  );
};

export default Toggler;
