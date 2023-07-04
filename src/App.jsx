import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Inicio from "./Components/Inicio";
import Carousel from "./Components/Carousel";
import Buscador from "./Components/Buscador";
import BookList from "./Components/BookList";
import PaymentMethods from "./Components/PaymentMethods";
import ListComponent from "./Components/ListComponent"; 
import BookDetails from "./Components/BookDetails";

const App = () => {
  return (        
    <Router>      
      <Navbar />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/carousel" element={<Carousel />} />
        <Route path="/buscador" element={<Buscador />} />
        <Route path="/booklist" element={<BookList />} />
        <Route path="/paymentmethods" element={<PaymentMethods />} />
        <Route path="/ListComponent" element={<ListComponent />} />
        <Route path="/bookDetails/:index" element={<BookDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
