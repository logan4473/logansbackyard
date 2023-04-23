import React, { useContext, useEffect, useState } from "react";
import Home from "./Components/Home";
import Navigation from "./Components/Navigation";
import { BrowserRouter, Route } from "react-router-dom";
import Product from "./Components/Product";
import { Switch } from "react-router-dom/cjs/react-router-dom.min";
import Search from "./Components/Search";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Error from "./Components/Error";
import Payment from "./Components/Payment";
import Summary from "./Components/Summary";
import axios from "axios";

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const url = new URLSearchParams({ token: token });
      axios
        .post("https://logansbackyardapi.onrender.com/api/verify", url)
        .then(({ data }) => {
          setUser(data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login/" component={Login} />
        <Route path="/signup/" component={Signup} />
        <Route path="/" component={Home} exact />
        <Route
          path="/product/:id([0-9a-fA-F]{24})?"
          render={(props) => (
            <>
              <Navigation />
              <Product id={props.match.params.id} />
            </>
          )}
          exact
        />
        <Route path="/search/" component={Search} />
        <Route path="/payment/" component={Payment} />
        <Route path="/summary/" component={Summary} />
        <Route path="*" component={Error} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
