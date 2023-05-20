import { Route, Routes } from "react-router";
import "./App.css";
import { Home } from "./pages/home/Home";
import Mockman from "mockman-js";
import { Header } from "./components/header/Header";
import { Products } from "./pages/productsListing/Products";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/mock" element={<Mockman />} />
      </Routes>
    </div>
  );
}

export default App;
