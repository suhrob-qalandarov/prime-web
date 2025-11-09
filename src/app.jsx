import {Route, Routes, useLocation} from "react-router-dom";
import {Login, Catalog, AboutUs, Contact, Navbar, Footer, Home, Profile} from "./components/index";

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
                <Route path="/cart" element={ <Profile /> }/>
                <Route path="/order" element={ <Profile /> }/>
            </Routes>
            {!hideFooterPages.includes(location.pathname) && <Footer />}
        </div>
    )
}

export default App;