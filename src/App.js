import { useEffect } from "react";
import Axios from "axios";
import { useDispatch } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { setValue } from "./redux/employeeSlice";
import { LoginPage } from "./pages/login";
import { AddEmployeePage } from "./components/addEmployee";
import { RegisterPage } from "./pages/register";
import { HomePage } from "./pages/home";
import { EmployeeList } from "./pages/employee";
import { AttendanceTable } from "./pages/attendance";
import { SalaryPage } from "./pages/salaryPage";
const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/addEmployee", element: <AddEmployeePage /> },
  { path: "/employee", element: <EmployeeList /> },
  { path: "/attendance", element: <AttendanceTable /> },
  { path: "/salary", element: <SalaryPage /> },
  { path: "/register/:token", element: <RegisterPage /> },
]);
function App() {
  const token = localStorage.getItem("token");
  
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const dispatch = useDispatch();
  const keepLogin = async () => {
    try {
      const response = await Axios.get("http://localhost:8000/auth/keepLogin", {
        headers,
      });
      dispatch(setValue(response.data));
      console.log(response.data);
    } catch (error) {
      console.log(error);
      
    }
  };
  useEffect(() => {
    keepLogin();
  }, []);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
