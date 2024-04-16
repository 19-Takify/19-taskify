import { ReactNode } from 'react';

type MainLayoutProps = {
  children: ReactNode;
};

function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <header></header>
      <main>{children}</main>
      <footer></footer>
    </>
  );
}

export default MainLayout;
