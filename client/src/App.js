import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Footer from "./Components/Footer";
import NavBar from "./Components/Navbar";
import AboutView from "./Views/About";
import BlogListConatiner from "./Container/BlogList";
import ContactContainer from "./Container/Contact";
import BlogContainer from "./Container/Blog";

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route exact path="/" component={BlogListConatiner} />
          <Route exact path="/about" component={AboutView} />
          <Route exact path="/contact" component={ContactContainer} />
          <Route exact path="/blog/:id" component={BlogContainer} />
        </Switch>
        <Footer />
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
