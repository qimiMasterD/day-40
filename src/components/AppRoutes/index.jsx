import { HashRouter as Router, Routes, Route } from "react-router";

// Pages
import TaskList from "../../pages/TaskList";
import EditTask from "../../pages/EditTask";
import NewTask from "../../pages/NewTask";

function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<TaskList />} />
                <Route path="/new-task" element={<NewTask />}></Route>
                <Route path="/:id/edit" element={<EditTask />}></Route>
            </Routes>
        </Router>
    );
}

export default AppRoutes;
