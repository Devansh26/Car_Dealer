import './App.css';
import Home from "./pages/home";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Cars from "./pages/Cars";
import GlobalStyles from './styles/GlobalStyles';
import Orders from "./pages/Orders";

function App() {
    return (
        <>
            <GlobalStyles />
            <Router>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/signup" element={<Signup/>}/>
                    <Route path="/cars" element={<Cars/>}/>
                    <Route path="/orders" element={<Orders/>}/>
                </Routes>
            </Router>
        </>

    );
}

export default App;
