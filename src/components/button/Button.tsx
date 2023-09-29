import { MouseEventHandler, ReactNode } from 'react';

type IButtonProps = {
  xl?: boolean;
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  icon?: ReactNode;
  className?: string;
  disabled?: boolean;
  type?: string;
  style?: any;
};

const Button = (props: IButtonProps) => {
  return (
    <button
      {...props}
      type="button"
      className={` py-[12px]  ${
        props.type === 'secondary'
          ? 'text-[#98A2B3] bg-[#1D2939] '
          : 'text-[#0C111D] bg-[#FFAF1D] hover:bg-[#ffaf1dbf]'
      }  rounded-md flex items-center gap-2 font-[500] text-[17px] ${
        props.className
      } disabled:text-[#98A2B3] disabled:bg-[#1D2939]`}
    >
      {props.icon}
      {props.children}
    </button>
  );
};

export { Button };
