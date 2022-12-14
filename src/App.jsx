import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Cart from './components/Cart/Cart'
import Categories from './components/Categories/Categories';
import Category from './components/Categories/Category';
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import NotFound from "./components/NotFound/NotFound";
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
          <Route path="details/:productDetails" element={<ProductDetails/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/*" element={<NotFound/>}/>
        </Routes>
        <Footer/>
      </Router>
    </>
  );
}

export default App;
