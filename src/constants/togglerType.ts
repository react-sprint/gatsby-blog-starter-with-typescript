export type Color = 'dark' | 'light';

export const COLOR = {
  LOCAL_STORAGE_KEY: 'color-mode',
  MEDIA_KEY: '(prefers-color-scheme: dark)',
  DARK_MODE: 'dark' as Color,
  LIGHT_MODE: 'light' as Color,
};
