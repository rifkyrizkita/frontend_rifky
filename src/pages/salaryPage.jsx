import { Navigate } from "react-router-dom"
import { Navbar } from "../components/navbar"
import { Salary } from "../components/salary"

export const SalaryPage = () => {
    const token = localStorage.getItem("token")
    return token ?(
        <>
        <Navbar/>
        <Salary/>
        </>
    ): (<Navigate to="/login"/>)
}