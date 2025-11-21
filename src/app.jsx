import {Route, Routes, useLocation} from "react-router-dom";
import {Login, Catalog, AboutUs, Contact, Navbar, Footer, Home, Profile, ConfirmOrder, Cart} from "./components/index";

const App = () => {
    const location = useLocation();
    const hideFooterPages = ["/login"];

    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/catalog" element={ <Catalog /> }/>
                <Route path="/about-us" element={ <AboutUs /> }/>
                <Route path="/contact" element={ <Contact /> }/>
                <Route path="/login" element={ <Login /> }/>
                <Route path="/profile" element={ <Profile /> }/>
                <Route path="/cart" element={ <Cart /> }/>
                <Route path="/order" element={ <ConfirmOrder /> }/>
            </Routes>
            {!hideFooterPages.includes(location.pathname) && <Footer />}
        </div>
    )
}

export default App;