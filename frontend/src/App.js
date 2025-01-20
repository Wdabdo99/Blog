import Header from "./components/header/Header.jsx";
import Footer from "./components/footer/Footer.jsx";
import RoutesLinks from "./components/header/Routes.jsx";
import { ToastContainer } from "react-toastify";


function App() {
    return (
        <div className="App">
              <ToastContainer theme="colored" position="top-center" />
            <Header />
            <RoutesLinks />
            <Footer />
        </div>
    );
}

export default App;
