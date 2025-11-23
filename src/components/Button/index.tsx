import type React from 'react';

interface ButtonProps {
  children: React.ReactNode;
}

export const Button = ({ children }: ButtonProps) => {
  return (
    <div className="relative inline-block group cursor-pointer">
      <div
        aria-hidden="true"
        className={`
          absolute inset-0 
          bg-black border-2 border-black
          translate-x-[6px] translate-y-[6px] 
          -z-10
        `}
      ></div>

      <button
        className={`
          relative z-10
          border-2 border-black bg-background
          px-3 py-3 font-bold text-text uppercase tracking-wider
          transition-transform duration-150 ease-out
          active:translate-x-[6px] active:translate-y-[6px]
          hover:translate-x-[5px] hover:translate-y-[5px]
        `}
      >
        {children}
      </button>
    </div>
  );
};
