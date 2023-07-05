import React from "react";
import Carousel from "./Carousel";
import Buscador from "./Buscador";
import BookList from "./BookList";          
import PaymentMethods from "./PaymentMethods";
import ListComponent from "./ListComponent";     

const Inicio = () => {
  return (
    <div>
      <Carousel />
      <Buscador />
      <BookList />
      <PaymentMethods />
      <ListComponent />
    </div>
  );
};

export default Inicio;
