import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Help from "./Components/Help";
import Clients from "./Components/Clients";
import BookDetails from "./Components/BookDetails";
import BookList from "./Components/BookList";
import PaymentMethods from "./Components/PaymentMethods";
import ListComponent from "./Components/ListComponent";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/ayuda" component={Help} />
        <Route path="/clientes" component={Clients} />
        <Route path="/book/:id" component={BookDetails} />
        <Route path="/books" component={BookList} />
        <Route path="/payment" component={PaymentMethods} />
        <Route path="/list" component={ListComponent} />
      </Switch>
    </Router>
  );
};

export default App;
