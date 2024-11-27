import React from "react";
import { Header, Footer } from "../components";

interface HomeLayoutProps {
  children: React.ReactNode;
}
const HomeLayout: React.FC<HomeLayoutProps> = ({ children }): JSX.Element => {
  return (
    <div suppressHydrationWarning>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default React.memo(HomeLayout);
