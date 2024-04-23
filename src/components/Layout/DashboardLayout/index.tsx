import { PropsWithChildren } from 'react';

function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <>
      <header></header>
      <main>{children}</main>
      <footer></footer>
    </>
  );
}

export default DashboardLayout;
