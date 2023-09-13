import { ReactNode } from 'react';
interface HomeLayoutProps {
  children: ReactNode;
}
const HomeLayout = ({ children }: HomeLayoutProps) => {
  return <>{children}</>;
};

export default HomeLayout;
