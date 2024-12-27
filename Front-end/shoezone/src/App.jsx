import { Route, Routes } from 'react-router-dom';
import Register from "./componenets/Auth/Register"
import Login from './componenets/Auth/Login';
// import Layout from './componenets/Mainlayout';
import Home from './pages/Home';
// import { LoginLayout } from './componenets/Loginlayout';
// // import 'bootstrap/dist/css/bootstrap.min.css';



function App() {

  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
    <Routes>
    {/* <Route element={<LoginLayout />} > */}
      <Route path='register' element={<Register />} />
      <Route path='login' element={<Login />} />
      <Route path='/' element={<Home />} />
      {/* </Route> */}
      {/* <Route element={<Layout />} >
        
      </Route> */}
    </Routes>
    
    </div>
  )
}

export default App
