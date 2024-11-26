import React from "react";
import { HomeLayout } from "./layouts";
import Home from "./pages/Home";
const App: React.FC = () => {
  return (
    <HomeLayout>
      <Home />
    </HomeLayout>
  );
};

export default App;
