import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Footer from "./Components/Footer";
import NavBar from "./Components/Navbar";
import AboutComponent from "./Components/About";
import BlogContainer from "./Container/Blog";
import ContactContainer from "./Container/Contact";

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route exact path="/" component={BlogContainer} />
          <Route exact path="/about" component={AboutComponent} />
          <Route exact path="/contact" component={ContactContainer} />
        </Switch>
        <Footer />
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
