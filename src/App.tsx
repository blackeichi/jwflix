import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Tv from "./Routes/Tv";
import Home from "./Routes/Home";
import Search from "./Routes/Search";
import Header from "./Components/Header";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path={["/jwflix/tv", "/jwflix/tv/:movieId"]}>
          <Tv />
        </Route>
        <Route path="/search">
          <Search />
        </Route>
        <Route path={["/jwflix", "/movies/:movieId"]}>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
