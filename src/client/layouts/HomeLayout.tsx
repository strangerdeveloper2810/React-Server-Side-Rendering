import React from "react";
import { Header, Content, Footer } from "../components";

interface HomeLayoutProps {
  children: React.ReactNode;
}
const HomeLayout: React.FC<HomeLayoutProps> = ({ children }): JSX.Element => {
  return (
    <div suppressHydrationWarning>
      <Header />
      <Content>{children}</Content>
      <Footer />
    </div>
  );
};

export default React.memo(HomeLayout);
