import { Route, Routes } from 'react-router-dom';
import Register from "./componenets/Auth/Register"
import Login from './componenets/Auth/Login';
import Layout from './componenets/Mainlayout';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import { LoginLayout } from './componenets/Loginlayout';
import AdminProduct from './componenets/Admin/Adminproduct';
import PaymentDetails from './pages/PaymentDetails';
import Order from './pages/Order';
import Adminuser from './componenets/Admin/AdminUser';
import Adminlayout from './componenets/Admin/AdminLayout';
import AdminHome from './componenets/Admin/Dashboard';
// // import 'bootstrap/dist/css/bootstrap.min.css';



function App() {

  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
    <Routes>
    <Route element={<LoginLayout />} >
      <Route path='register' element={<Register />} />
      <Route path='login' element={<Login />} />
      <Route path='/payment' element={<PaymentDetails />} />
      
      </Route>
      <Route element={<Layout />} >
      <Route path='/' element={<Home />} />
      <Route path='/shop' element={<Shop />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/wishlist' element={<Wishlist />} />
      <Route path='/order' element={<Order />} />
      
      </Route>
    <Route element={<Adminlayout />}>
    <Route path='/admin' element={<AdminHome />} />
      <Route path='/adminproduct' element={<AdminProduct />} />
      <Route path='/adminuser' element={<Adminuser />} />
      </Route>
    </Routes>
    
    </div>
  )
}

export default App
