import { MouseEventHandler, ReactNode } from 'react';

type IButtonProps = {
  xl?: boolean;
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

const Button = (props: IButtonProps) => {

  return (
    <button {...props} type="button" className="px-8 py-3 font-semibold rounded-full dark:bg-gray-100 dark:text-gray-800">
      {props.children}
    </button>

  );
};

export { Button };
