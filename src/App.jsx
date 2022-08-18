import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Cart from './components/Cart/Cart'
import Categories from './components/Categories/Categories';
import Category from './components/Categories/Category';
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import ProductDetails from "./components/ProductDetails/ProductDetails";

function App() {
  return (
    <>
      <Router>
          <Header/>
        <Routes>
          <Route path="/" element={<Navigate replace to="/home"/>}/>
          <Route path="/home" element={<Home />}/>
          <Route path="/categories" element={<Categories/>}>
            <Route path=":category" element={<Category/>}/>
          </Route>
          <Route path="Details/:productDetails" element={<ProductDetails/>}/>
          <Route path="/cart" element={<Cart/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
