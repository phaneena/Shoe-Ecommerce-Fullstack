// import { useContext, useState } from "react";
// import { NavLink, Link, useNavigate } from "react-router-dom";
// import { IoMdSearch } from "react-icons/io";
// import { CgProfile } from "react-icons/cg";
// import { IoMdCart } from "react-icons/io";
// import {MdOutlineFavoriteBorder} from "react-icons/md";
// import { IoIosMenu } from "react-icons/io";
// // import { shoecontext } from "../Context/ShopContext";
// import { toast, ToastContainer } from "react-toastify";

// function Navbar() {
//   const navigate = useNavigate();
//   const [visible, setVisible] = useState(false);
//   const { cartCount, wishlistCount } = useContext(shoecontext); // Assuming you are storing wishlist count in context

//   const handleLogout = () => {
//     localStorage.removeItem("id");
//     toast.success("Logout successfully");
//     navigate("/login");
//     window.location.reload();
//   };

//   const handleCart = () => {
//     if (!localStorage.getItem("id")) {
//       toast.success("Must be logged in");
//     } else {
//       navigate("/cart");
//     }
//   };

//   const handleOrderList = () => {
//     if (!localStorage.getItem("id")) {
//       toast.success("Must be logged in");
//     } else {
//       navigate("/orderlist");
//     }
//   };

//   const handleWishlist = () => {
//     if (!localStorage.getItem("id")) {
//       toast.success("Must be logged in");
//     } else {
//       navigate("/wishlist"); // Assuming you have a wishlist page
//     }
//   };

//   const handleSearch = (e) => {
//     const query = e.target.value;
//     if (query.trim()) {
//       navigate(`/search?term=${encodeURIComponent(query.trim())}`);
//     }
//   };

//   return (
//     <div className="w-full sticky top-0 z-10 bg-gray-200">
//       <div className="flex items-center justify-between py-4 font-medium max-w-screen-xl mx-auto">
//         <NavLink className="navbar-brand" to="/">
//           <h1 className="text-xl lg:text-3xl">SHOE ZONE</h1>
//         </NavLink>
//         <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
//           <NavLink to="/">
//             <li>HOME</li>
//           </NavLink>
//           <NavLink to="/shop">
//             <li>SHOP</li>
//           </NavLink>
//           <NavLink to="/mens">
//             <li>MEN</li>
//           </NavLink>
//           <NavLink to="/womens">
//             <li>WOMEN</li>
//           </NavLink>
//         </ul>
//         <div className="flex items-center gap-6">
//           <div className="relative group hidden sm:block">
//             <input
//               type="text"
//               placeholder="Search"
//               onChange={handleSearch}
//               className="w-[200px] sm:w-[200px] group-hover:w-[300px] transition-all duration-300 rounded-full border border-gray px-2 py-1 focus:outline-none focus:border-1 focus:border-primary active:border-1 active:border-primary"
//             />
//             <IoMdSearch className="text-xl text-gray-500 group-hover:text-primary absolute top-1/2 -translate-y-1/2 right-3" />
//           </div>
//           <div className="group relative">
//             <CgProfile className="text-3xl cursor-pointer" />
//             <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
//               <div className="flex flex-col gap-2 w-30 py-3 px-5 bg-slate-100 text-gray-500 rounded">
//                 {!localStorage.getItem("id") && (
//                   <Link to="/login">
//                     <button className="cursor-pointer hover:text-black">
//                       Login
//                     </button>
//                   </Link>
//                 )}
//                 <button
//                   onClick={handleOrderList}
//                   className="cursor-pointer hover:text-black"
//                 >
//                   Orders
//                 </button>
//                 {localStorage.getItem("id") && (
//                   <button
//                     onClick={handleLogout}
//                     className="cursor-pointer hover:text-black"
//                   >
//                     Logout
//                   </button>
//                 )}
//               </div>
//             </div>
//             {localStorage.getItem("id") ? (
//               <div className="text-sm">{localStorage.getItem("name")}</div>
//             ) : (
//               ""
//             )}
//           </div>
//           {/* Wishlist Icon */}
//           <button onClick={handleWishlist} className="relative">
//             <MdOutlineFavoriteBorder className="text-3xl cursor-pointer" />
//             {wishlistCount > 0 && (
//               <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs sm:-top-3 sm:-right-3 sm:w-5 sm:h-5 sm:text-sm lg:-top-4 lg:-right-4 lg:w-6 lg:h-6 lg:text-sm">
//                 {wishlistCount}
//               </span>
//             )}
//           </button>
//           {/* Cart Icon */}
//           <button onClick={handleCart} className="relative">
//             <IoMdCart className="text-3xl cursor-pointer" />
//             {cartCount > 0 && (
//               <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs sm:-top-3 sm:-right-3 sm:w-5 sm:h-5 sm:text-sm lg:-top-4 lg:-right-4 lg:w-6 lg:h-6 lg:text-sm">
//                 {cartCount}
//               </span>
//             )}
//           </button>
//           <IoIosMenu
//             onClick={() => setVisible(true)}
//             className="text-3xl cursor-pointer sm:hidden"
//           />
//         </div>

//         {/* Menu for small screen */}
//         <div
//           className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
//             visible ? "w-full" : "w-0"
//           }`}
//         >
//           <div className="flex flex-col text-gray-600">
//             <div
//               onClick={() => setVisible(false)}
//               className="flex items-center gap-4 p-3"
//             >
//               <p>Back</p>
//             </div>
//             <NavLink
//               onClick={() => setVisible(false)}
//               to="/"
//               className="py-2 pl-6 border"
//             >
//               HOME
//             </NavLink>
//             <NavLink
//               onClick={() => setVisible(false)}
//               to="/shop"
//               className="py-2 pl-6 border"
//             >
//               SHOP
//             </NavLink>
//             <NavLink
//               onClick={() => setVisible(false)}
//               to="/mens"
//               className="py-2 pl-6 border"
//             >
//               MEN
//             </NavLink>
//             <NavLink
//               onClick={() => setVisible(false)}
//               to="/womens"
//               className="py-2 pl-6 border"
//             >
//               WOMEN
//             </NavLink>
//           </div>
//         </div>
//         <ToastContainer />
//       </div>
//     </div>
//   );
// }

// export default Navbar;