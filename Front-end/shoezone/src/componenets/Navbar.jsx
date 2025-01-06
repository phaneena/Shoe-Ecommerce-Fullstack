import { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { IoMdSearch } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { IoMdCart } from "react-icons/io";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { IoIosMenu, IoIosClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../features/productSlice";
import { logoutUser } from "../features/authSlice";
import { toast } from "react-toastify";
import { fetchUserDetails } from "../features/authSlice";
import { getCart} from "../features/cartSlice";

function Navbar() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getAllProducts({ search }));
  }, [search, dispatch]);

  useEffect(() => {
    dispatch(fetchUserDetails());
    dispatch(getCart());
  }, [dispatch]);

  const handleCart = () => {
    if (user) {
      navigate("/cart");
    } else {
      toast.error("Please log in to access the cart");
    }
  };

  const handleWishlist = () => {
    if (user) {
      navigate("/wishlist");
    } else {
      toast.error("Please log in to access the wishlist");
    }
  };

  const handleOrderList = () => {
    if (user) {
      navigate("/order");
    } else {
      toast.error("Please log in to view your orders");
    }
  };

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap()
    
      .then((response) =>
        navigate('/')
      )
      window.location.reload()
      toast.success("Logout successfully")

    } catch (error) {
      toast.error("Error during logout");
    }
  };

  return (
    <div className="w-full sticky top-0 z-10 bg-gray-200">
      <div className="flex items-center justify-between py-4 font-medium max-w-screen-xl mx-auto px-4">
        <NavLink className="navbar-brand" to="/">
          <h1 className="text-xl lg:text-3xl">SHOE ZONE</h1>
        </NavLink>
        <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
          <NavLink to="/">
            <li>HOME</li>
          </NavLink>
          <NavLink to="/shop">
            <li>SHOP</li>
          </NavLink>
        </ul>
        <div className="flex items-center gap-6">
          {/* Search Bar */}
          <div className="relative group hidden sm:block">
            <input
              value={search}
              type="text"
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
              className="w-[200px] group-hover:w-[300px] transition-all duration-300 rounded-full border px-2 py-1 focus:outline-none focus:border-primary"
            />
            <IoMdSearch className="text-xl text-gray-500 group-hover:text-primary absolute top-1/2 -translate-y-1/2 right-3" />
          </div>
          <div className="group relative">
            <CgProfile className="text-3xl cursor-pointer" />
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
              <div className="flex flex-col gap-2 w-30 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                {!user && (
                  <Link to="/login">
                    <button className="hover:text-black">Login</button>
                  </Link>
                )}
                {user && (
                  <>
                    <button
                      onClick={handleOrderList}
                      className="hover:text-black"
                    >
                      Orders
                    </button>
                    <button onClick={handleLogout} className="hover:text-black">
                      Logout
                    </button>
                  </>
                )}
              </div>
            </div>
            {user && <div className="text-sm">{user?.username}</div>}
          </div>
          <button onClick={handleWishlist} className="relative">
            <MdOutlineFavoriteBorder className="text-3xl cursor-pointer" />
          </button>
          <button onClick={handleCart} className="relative">
            <IoMdCart className="text-3xl cursor-pointer" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cart?.length}
              </span>
            )}
          </button>
          <IoIosMenu
            onClick={() => setVisible(true)}
            className="text-3xl cursor-pointer sm:hidden"
          />
        </div>
        {/* Mobile Menu */}
        <div
          className={`fixed top-0 right-0 bottom-0 bg-white transition-all duration-300 ${
            visible ? "w-3/4" : "w-0"
          } overflow-hidden z-20`}
        >
          <div className="flex flex-col h-full">
            <div className="p-3 flex justify-between items-center border-b">
              <h2 className="text-lg font-bold">Menu</h2>
              <IoIosClose
                onClick={() => setVisible(false)}
                className="text-3xl cursor-pointer"
              />
            </div>
            <div className="flex flex-col text-gray-600 p-4">
              <NavLink
                onClick={() => setVisible(false)}
                to="/"
                className="py-2 border-b"
              >
                HOME
              </NavLink>
              <NavLink
                onClick={() => setVisible(false)}
                to="/shop"
                className="py-2 border-b"
              >
                SHOP
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
