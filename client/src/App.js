import { ChakraProvider } from "@chakra-ui/react";
import Footer from "./Components/Footer";
import NavBar from "./Components/Navbar";
import BlogContainer from "./Container/Blog";

function App() {
  return (
    <ChakraProvider>
      <NavBar />
      <BlogContainer />
      <Footer />
    </ChakraProvider>
  );
}

export default App;
