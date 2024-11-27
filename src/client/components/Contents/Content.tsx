import React from "react";

interface ContentProps {
  children: React.ReactNode;
}

const Content: React.FC<ContentProps> = ({ children }): JSX.Element => {
  return (
    <div>
      <h1>content nè</h1>
      {children}
    </div>
  );
};

export default Content;
