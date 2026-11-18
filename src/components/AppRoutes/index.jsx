import { HashRouter as Router, Routes, Route } from "react-router";

// Pages
import Demo from "../../pages/Demo";

function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/demo" element={<Demo />} />
            </Routes>
        </Router>
    );
}

export default AppRoutes;
