import Mainshooo from '/assets/mainshoe.jpg'
import Shop from "./Shop";
import Footer from "../Components/Footer";
function Home() {

    return (
        <div>
        <div className="w-full flex justify-center items-center">
                <img 
                    src={Mainshooo}
                    alt="Main Shoe"
                    className="w-full h-96 object-cover" 
                />
        </div>
        <h1 className="font-extrabold text-3xl text-center mt-2 mb-5 bg-black text-white p-4 rounded-lg shadow-lg">LATEST COLLECTIONS</h1>

        <Shop />
        <Footer />
            
        </div>
    );
}

export default Home;

