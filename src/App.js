import Home from "./components/Home";
import About from "./components/About";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import NoteState from "./context/notes/NoteState";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
    return (
        <>
            <NoteState>
                <Router>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        {localStorage.getItem("token")?<>
                        <Route path="/about" element={<About />} />
                        </>:<Route path="/about" element={<Login />} />}
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                    </Routes>
                </Router>
            </NoteState>
        </>
    );
}

export default App;