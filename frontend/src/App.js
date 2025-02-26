import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Updateaction from "./Updateaction";
import Details from "./student";
import Submitaction from "./Submitactions";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Details />} />
                <Route path="/edit-student/:id" element={<Updateaction />} />
                <Route path="/add-student" element={<Submitaction/>} />
            </Routes>
        </Router>
    );
}

export default App;
