import className from 'classnames';
import { MouseEventHandler, ReactNode } from 'react';

type IButtonProps = {
  xl?: boolean;
  children: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

const Button = (props: IButtonProps) => {
  const btnClass = className({
    btn: true,
    'btn-xl': props.xl,
    'btn-base': !props.xl,
    'btn-primary': true,
    'bordered': true

  });

  return (
    <button {...props} type="button" className="px-8 py-3 font-semibold rounded-full dark:bg-gray-100 dark:text-gray-800">
      {props.children}
    </button>

  );
};

export { Button };
