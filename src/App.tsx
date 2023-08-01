import React from "react";
import Routes from "./routes";

import { AuthProvider } from "./Contexts/descartar";

const App = () => {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
};

export default App;
