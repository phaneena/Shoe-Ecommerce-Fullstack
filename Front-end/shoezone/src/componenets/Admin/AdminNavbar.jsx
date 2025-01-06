import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../../features/authSlice';

const AdminNavbar = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch()

  const handleLogout = () => {
    console.log('User logged out');
    dispatch(logoutUser())
    navigate('/login');
  };

  return (
    <div className="flex h-screen sticky top-0">
      {/* Sidebar */}
      <nav className="flex-none w-60 bg-gray-700 text-white shadow-lg">
        <h1 className="text-2xl lg:text-3xl font-bold text-center py-6 text-blue-400">SHOE ZONE</h1>
        
        <div className="mt-8">
          <ul className="space-y-4">
            <Link to="/admin" className="text-white no-underline">
              <li className="flex items-center p-4 hover:bg-gray-600 hover:text-white transition-all duration-300 font-medium cursor-pointer">
                DASHBOARD
              </li>
            </Link>
            <Link to="/adminuser" className="text-white no-underline">
              <li className="flex items-center p-4 hover:bg-gray-600 hover:text-white transition-all duration-300 font-medium cursor-pointer">
                USER
              </li>
            </Link>
            <Link to="/adminproduct" className="text-white no-underline">
              <li className="flex items-center p-4 hover:bg-gray-600 hover:text-white transition-all duration-300 font-medium cursor-pointer">
                PRODUCT
              </li>
            </Link>
          </ul>
        </div>
        
        <div className="absolute bottom-0 w-full p-6">
          <button
            onClick={handleLogout}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-bold transition-all duration-200 focus:outline-none"
          >
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
};

export default AdminNavbar;
