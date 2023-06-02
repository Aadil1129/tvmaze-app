import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Summary from "./components/Summary";
import BookTicket from "./components/BookTicket";
import "@fontsource/montserrat";
import "./index.css";

const App = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/summary/:id" component={Summary} />
        <Route path="/book/:id" component={BookTicket} />
      </Switch>
    </>
  );
};

export default App;
