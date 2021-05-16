import React, {useEffect,useState} from 'react'
import { BrowserRouter as Router, Redirect, Route,Switch } from 'react-router-dom'
import Footer from './components/Footer/Footer';
import CategoryDetails from './pages/CategoryDetails/CategoryDetails';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import axios from 'axios'
import './App.css'
import { LastLocationProvider } from 'react-router-last-location';
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


// export const UserContext = React.createContext();
// export const PageContext = React.createContext();

toast.configure();

function App() {
    
  const title = "FoodNet"; // FoodNet
  const clientRootUrl = "http://localhost:3000/";
  const apiRootUrl = "http://localhost:9000/";
  const token = localStorage.getItem('wpt'); // same in NavBar.js
  const [loggedInStatus, setLoggedInStatus] = useState(null);
  const errorMessage = "An error occured. Please try again!";
  const [cartNum, setCartNum] = useState(0);


  useEffect(()=>{
    /** get cartItems number */
    axios.get(`${apiRootUrl}cart/`, {
      headers: {
          Authorization: `Bearer ${token}`
      }
  })
  .then(({data})=>{
    setCartNum(data.cartItems.length);
    
  })
  .catch(err=>{
    // toast.error(errorMessage, {
    //     position: toast.POSITION.BOTTOM_RIGHT
    // })
})
  }, [token])

  /** when product is added/removed from cart, update cartNum */

  return (
    <React.Fragment>
        <Router>
          <LastLocationProvider>
          <ScrollToTop />
          <Switch>
            

            <Route path = "/category/:categoryId" exact = {true} component = {({match})=>(<CategoryDetails loggedInStatus = {loggedInStatus} title = {title} apiRootUrl = {apiRootUrl} clientRootUrl = {clientRootUrl} match = {match} cartNum = {cartNum} token = {token} errorMessage = {errorMessage} />)} />
            {/* categories --> all categories(4 per one) -> see all */}
            
          </Switch>
          </LastLocationProvider>
          <Footer title = {title} clientRootUrl = {clientRootUrl}/>
        </Router>
    </React.Fragment>
  );
}

export default App;