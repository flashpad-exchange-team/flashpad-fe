import type { ReactNode } from 'react';

type IHeroOneButtonProps = {
  title: ReactNode;
  description: string;
};

const HeroOneButton = (props: IHeroOneButtonProps) => (
  <header className="text-center">
    <h1 className="whitespace-pre-line text-[48px] font-bold leading-hero text-white-900">
      {props.title}
    </h1>
    <div className="mb-16 mt-4 text-xl text-white max-w-lg mx-auto ">{props.description}</div>
  </header>
);

export { HeroOneButton };
