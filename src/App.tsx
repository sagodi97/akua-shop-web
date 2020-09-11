import React from "react";
import Navbar from "./components/navbar/Navbar";
import Carrousel from "./components/carrousel/Carrousel";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <Carrousel />
      <Footer />
    </div>
  );
}

export default App;
