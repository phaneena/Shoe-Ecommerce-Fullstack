import { FaFacebook, FaInstagramSquare, FaTwitterSquare } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-500 lg:px-16 px-8 lg:pt-12 pb-8">
      <section className="container mx-auto">
        <div className="flex flex-wrap justify-between items-start gap-20 lg:flex-nowrap">
          <div className="flex flex-col items-start">
            <p className="mt-6 text-base leading-7 text-[#fffc] sm:max-w-sm transition-transform duration-300 hover:scale-110">
              Get shoes ready for the new term at your nearest SHOEZONE store.
              Find Your Perfect Size in Store.
            </p>
            <div className="flex items-center gap-5 mt-8">
              <div className="flex justify-center items-center w-12 h-12 bg-[white] rounded-full transition-transform duration-300 hover:scale-110">
                <FaFacebook
                  style={{ width: "24", height: "24", cursor: "pointer" }}
                />
              </div>
              <div className="flex justify-center items-center w-12 h-12 bg-[white] rounded-full transition-transform duration-300 hover:scale-110">
                <FaInstagramSquare
                  style={{ width: "24", height: "24", cursor: "pointer" }}
                />
              </div>
              <div className="flex justify-center items-center w-12 h-12 bg-[white] rounded-full transition-transform duration-300 hover:scale-110">
                <FaTwitterSquare
                  style={{ width: "24", height: "24", cursor: "pointer" }}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row flex-wrap lg:space-x-8 w-full lg:w-auto">
            <div className="mb-6 lg:mb-0">
              <h4 className="text-white text-2xl leading-normal font-medium mb-4 transition-transform duration-300 hover:scale-110">
                COLLECTIONS
              </h4>
              <ul className="p-0">
                <Link to="/shop">
                  <li className="mt-2 text-[#fffc] list-none text-base leading-normal hover:text-[#b2ab9f] cursor-pointer">
                    SHOP
                  </li>
                </Link>
                <Link to="/men">
                  <li className="mt-2 text-[#fffc] list-none text-base leading-normal hover:text-[#b2ab9f] cursor-pointer">
                    MEN
                  </li>
                </Link>
                <Link to="/women">
                  <li className="mt-2 text-[#fffc] list-none text-base leading-normal hover:text-[#b2ab9f] cursor-pointer">
                    WOMEN
                  </li>
                </Link>
              </ul>
            </div>

            <div className="mb-6 lg:mb-0">
              <h4 className="text-white text-2xl leading-normal font-medium mb-4 transition-transform duration-300 hover:scale-110">
                CUSTOMER CARE
              </h4>
              <ul>
                <li className="mt-2 text-[#fffc] list-none text-base leading-normal hover:text-[#b2ab9f] cursor-pointer">
                  Timing : 10 AM - 7 PM (Mon - Sat)
                </li>
                <li className="mt-2 text-[#fffc] list-none text-base leading-normal hover:text-[#b2ab9f] cursor-pointer">
                  Email: Shoezone@gmail.com
                </li>
                <li className="mt-2 text-[#fffc] list-none text-base leading-normal hover:text-[#b2ab9f] cursor-pointer">
                  Call/Whatsapp: +91 9400112833
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}
