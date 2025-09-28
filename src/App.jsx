import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AddTask from "./components/addTask/AddTask";
import NavBar from "./components/navbar/NavBar";
import AllTasks from "./components/tasks/AllTasks";
import TaskDetails from "./components/TaskDetails/TaskDetails";
import { Toaster } from "react-hot-toast";
import AllTasksProvider from "./context/AllTasksProvider";
import TaskPage from "./components/page/TaskPage";

function App() {
  const router = createBrowserRouter([
    { index: true, element: <TaskPage /> },
    { path: "/taskDetails/:id", element: <TaskDetails /> },
  ]);

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <NavBar />
      <AllTasksProvider>
        <RouterProvider router={router} />
      </AllTasksProvider>
    </>
  );
}

export default App;
