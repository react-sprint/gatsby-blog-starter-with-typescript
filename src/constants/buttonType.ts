export const BUTTON_COLOR = {
  GREEN: 'green' as const,
  BLACK: 'black' as const,
};

type Keys = keyof typeof BUTTON_COLOR;
export type ButtonColorType = typeof BUTTON_COLOR[Keys];
