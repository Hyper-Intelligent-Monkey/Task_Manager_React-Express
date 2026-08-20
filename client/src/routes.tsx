
import { Routes, Route } from 'react-router-dom'
import Home from './view/home/Home'
import AddTask from './view/tasks/AddTaskPage'
import TaskDetails from './view/tasks/TaskDetails'
import EditTask from './view/tasks/EditTaskPage'
import ErrorPage from './view/errors/ErrorPage'

export function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddTask />} />
            <Route path="/edit/:id" element={<EditTask />} />
            <Route path="/task/:id" element={<TaskDetails />} />
            <Route path="/error" element={<ErrorPage />} />
            <Route path="*" element={<ErrorPage/>} />
        </Routes>
    );
}
