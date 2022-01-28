import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Header from './components/Header';
import Register from './components/Register';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './components/Login';
import RegisterBuyer from './components/RegisterBuyer';
import LoginBuyer from './components/LoginBuyer';
import MainPage from './components/MainPage';
import SellerPage from './components/SellerPage';
import AddProduct from './components/AddProduct';
import Cart from './components/Cart';
import LandingPage from './components/LandingPage';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path= '/' element ={<LandingPage/>}></Route>
          <Route exact path= '/products' element ={<MainPage/>}></Route>
          <Route exact path= '/allProducts' element ={<MainPage/>}></Route>
          <Route exact path= '/sellerPage' element ={<SellerPage/>}></Route>
          <Route exact path= '/addProduct' element ={<AddProduct/>}></Route>
          <Route exact path= '/register' element ={<Register/>}></Route>
          <Route exact path= '/login' element ={<LoginBuyer/>}></Route>
          <Route exact path= '/loginS' element ={<Login/>}></Route>
          <Route exact path= '/cart' element ={<Cart/>}></Route>
          <Route exact path= '/registerBuyer' element ={<RegisterBuyer/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
