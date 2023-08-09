import { MouseEventHandler, ReactNode } from 'react';

type IButtonProps = {
  xl?: boolean;
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  icon?: ReactNode;
  className?: string;
  disabled?: boolean
};

const Button = (props: IButtonProps) => {

  return (
    <button {...props} type="button" className={`px-[42px] py-[12px] bg-[#FFAF1D] text-[#0C111D] text-[18px] rounded-lg flex items-center gap-2 ${props.className} disabled:text-[#98A2B3] disabled:bg-[#1D2939]`}>
      {props.icon}
      {props.children}
    </button>

  );
};

export { Button };
