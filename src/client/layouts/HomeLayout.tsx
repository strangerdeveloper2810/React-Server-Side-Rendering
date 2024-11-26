import React from "react";
import { Header, Footer } from "../components";

interface HomeLayoutProps {
  children: React.ReactNode;
}
const HomeLayout: React.FC<HomeLayoutProps> = ({ children }): JSX.Element => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default React.memo(HomeLayout);
