import DashboardAdmin from "./DashboardAdmin"
import DashboardUser from "./DashboardUser"
import { useSelector } from "react-redux"
import Cookies from "js-cookie"
import axios from "axios"

export default function Home(){
    const role = useSelector(state=>state.user.role)

    return(
        <>
        {
            role === "admin" ?
            <DashboardAdmin/>
            :
            <DashboardUser/>

        }</>
    )
}