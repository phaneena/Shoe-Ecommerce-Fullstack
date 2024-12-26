import { Route, Routes } from 'react-router-dom';
import Register from "./componenets/Auth/Register"



function App() {

  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
    <Routes>
      <Route path='register' element={<Register />} />
    </Routes>
    </div>
  )
}

export default App
