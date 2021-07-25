import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Footer from "./Components/Footer";
import NavBar from "./Components/Navbar";
import AboutContainer from "./Container/About";
import BlogContainer from "./Container/Blog";
import ContactContainer from "./Container/Contact";

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route exact path="/" component={BlogContainer} />
          <Route exact path="/about" component={AboutContainer} />
          <Route exact path="/contact" component={ContactContainer} />
        </Switch>
        <Footer />
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
