import React, { ReactNode, MouseEvent } from 'react';

type Size = 'small' | 'medium';
type Theme = 'text' | 'gray' | 'tint' | 'fill';

const styleInfo = {
  small: 'h-[34px] px-2',
  medium: 'h-[40px] px-3',
  text: 'text-blue-500 disabled:opacity-25 rounded hover:bg-[#28292E14]',
  gray: 'text-gray-500 border rounded border-[#28292E1F] hover:bg-[#28292E14] disabled:opacity-50 active:bg-[#28292E14]',
  tint: 'text-blue-500 border rounded bg-blue-300 border-blue-300 hover:shadow-[inset_0_0_0_100px_rgba(40,41,46,0.08)] disabled:opacity-50',
  fill: 'text-white bg-blue-500 rounded hover:shadow-[inset_0_0_0_100px_rgba(40,41,46,0.08)] disabled:opacity-50',
} as const;

const Button: React.FC<{
  size: Size;
  theme: Theme;
  disabled: boolean;
  children: ReactNode;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}> = ({ size, theme, disabled, children, onClick }) => {
  return (
    <button
      className={`flex justify-center items-center ${styleInfo[size]} ${styleInfo[theme]} font-semibold`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export { Button };
