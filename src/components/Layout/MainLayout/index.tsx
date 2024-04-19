import { PropsWithChildren } from 'react';

function MainLayout({ children }: PropsWithChildren) {
  return (
    <>
      <header></header>
      <main>{children}</main>
      <footer></footer>
    </>
  );
}

export default MainLayout;
