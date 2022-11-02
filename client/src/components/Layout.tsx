import { ReactNode } from "react";
import TopBar from "./TopBar";
import Head from 'next/head';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>Market Place</title>
      </Head>
      <div className="relative flex h-full w-full flex-col pt-20">
        <TopBar />
        <div className="flex h-full w-full overflow-y-auto overflow-x-hidden px-36">
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;
