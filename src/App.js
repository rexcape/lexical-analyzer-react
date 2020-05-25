import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

import "./css/App.css"
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App container-fluid">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
